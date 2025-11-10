
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, Clock, BookOpen, BarChart3, Bell, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import CreateClassModal from '@/components/CreateClassModal';
import AttendanceModal from '@/components/AttendanceModal';
import TeacherStats from '@/components/teacher/TeacherStats';
import TeacherScheduleTab from '@/components/teacher/TeacherScheduleTab';
import TeacherAttendanceTab from '@/components/teacher/TeacherAttendanceTab';
import TeacherAnalyticsTab from '@/components/teacher/TeacherAnalyticsTab';
import { allStudents } from '@/data/students';

export default function TeacherDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    const savedClasses = localStorage.getItem('teacher_classes');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    } else {
        const mockClasses = [
          {
            id: 1,
            subject: 'Advanced Mathematics',
            date: '2025-07-15',
            time: '10:00',
            duration: 90,
            location: 'Room 301',
            students: allStudents.slice(0, 10).map(s => s.name),
            status: 'scheduled',
            attendance: {}
          },
          {
            id: 2,
            subject: 'Physics Lab',
            date: '2025-07-15',
            time: '14:00',
            duration: 120,
            location: 'Lab 205',
            students: allStudents.slice(10, 20).map(s => s.name),
            status: 'scheduled',
            attendance: {}
          },
          {
            id: 3,
            subject: 'Chemistry Basics',
            date: '2025-07-10',
            time: '09:00',
            duration: 60,
            location: 'Room 102',
            students: allStudents.slice(0, 5).map(s => s.name),
            status: 'completed',
            attendance: {
              [allStudents[0].name]: 'present',
              [allStudents[1].name]: 'absent',
              [allStudents[2].name]: 'present',
              [allStudents[3].name]: 'present',
              [allStudents[4].name]: 'late',
            }
          }
        ];
      setClasses(mockClasses);
      localStorage.setItem('teacher_classes', JSON.stringify(mockClasses));
    }
  }, []);

  const saveClasses = (updatedClasses) => {
    setClasses(updatedClasses);
    localStorage.setItem('teacher_classes', JSON.stringify(updatedClasses));
    // Simulate notifying students
    localStorage.setItem('student_classes', JSON.stringify(updatedClasses));
  };
  
  const addNotification = (classData) => {
    const newNotification = {
      id: Date.now(),
      type: 'new_class',
      message: `New class added: "${classData.subject}" on ${classData.date} at ${classData.time}.`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('student_notifications')) || [];
    localStorage.setItem('student_notifications', JSON.stringify([newNotification, ...existingNotifications]));
  };

  const handleCreateClass = (classData) => {
    const newClass = {
      ...classData,
      id: Date.now(),
      status: 'scheduled',
      attendance: {}
    };
    const updatedClasses = [...classes, newClass];
    saveClasses(updatedClasses);
    addNotification(newClass);
    toast({
      title: "Class Created!",
      description: `${classData.subject} has been scheduled and students notified.`,
    });
  };

  const handleDeleteClass = (classId) => {
    const updatedClasses = classes.filter(c => c.id !== classId);
    saveClasses(updatedClasses);
    toast({
      title: "Class Deleted",
      description: "The class has been removed from your schedule.",
    });
  };

  const handleMarkAttendance = (classId) => {
    const classToUpdate = classes.find(c => c.id === classId);
    setSelectedClass(classToUpdate);
    setShowAttendanceModal(true);
  };

  const handleSaveAttendance = (attendance) => {
    const updatedClasses = classes.map(c => 
      c.id === selectedClass.id 
        ? { ...c, attendance, status: 'completed' }
        : c
    );
    saveClasses(updatedClasses);
    toast({
      title: "Attendance Saved!",
      description: "Student attendance has been recorded.",
    });
  };
  
  const getTabContent = () => {
    switch(activeTab) {
      case 'schedule':
        return <TeacherScheduleTab 
                  classes={classes} 
                  onMarkAttendance={handleMarkAttendance} 
                  onDeleteClass={handleDeleteClass} 
                  setShowCreateModal={setShowCreateModal}
                />;
      case 'attendance':
        return <TeacherAttendanceTab classes={classes} />;
      case 'analytics':
        return <TeacherAnalyticsTab classes={classes} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <TeacherStats classes={classes} />

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1">
        {[
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(id)}
            className={`flex-1 ${activeTab === id 
              ? 'bg-white text-purple-600' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {getTabContent()}

      {/* Modals */}
      {showCreateModal && (
        <CreateClassModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateClass}
        />
      )}

      {showAttendanceModal && selectedClass && (
        <AttendanceModal
          class={selectedClass}
          onClose={() => setShowAttendanceModal(false)}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  );
}
