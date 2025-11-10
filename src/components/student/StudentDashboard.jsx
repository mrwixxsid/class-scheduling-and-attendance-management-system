
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudentStats from '@/components/student/StudentStats';
import StudentScheduleTab from '@/components/student/StudentScheduleTab';
import StudentAttendanceTab from '@/components/student/StudentAttendanceTab';
import StudentNotificationsTab from '@/components/student/StudentNotificationsTab';

export default function StudentDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    // Load student data from localStorage
    const loadData = () => {
        const studentClasses = JSON.parse(localStorage.getItem('student_classes')) || [];
        const studentNotifications = JSON.parse(localStorage.getItem('student_notifications')) || [];
        
        // Filter classes to show only those the student is enrolled in
        const enrolledClasses = studentClasses.filter(c => c.students.includes(user.name));
        setClasses(enrolledClasses);
        setNotifications(studentNotifications);
    };

    loadData();

    // Listen for changes in localStorage
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [user.name]);

  const markNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('student_notifications', JSON.stringify(updatedNotifications));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getTabContent = () => {
    switch(activeTab) {
      case 'schedule':
        return <StudentScheduleTab classes={classes} />;
      case 'attendance':
        return <StudentAttendanceTab classes={classes} />;
      case 'notifications':
        return <StudentNotificationsTab notifications={notifications} onMarkAsRead={markNotificationsAsRead} />;
      default:
        return null;
    }
  };


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
        <p className="text-purple-200">Stay on top of your classes and track your progress</p>
      </motion.div>

      <StudentStats classes={classes} />

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1">
        {[
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: BarChart3 },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null }
        ].map(({ id, label, icon: Icon, badge }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(id)}
            className={`flex-1 relative ${activeTab === id 
              ? 'bg-white text-purple-600' 
              : 'text-white hover:bg-white/10'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
            {badge && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {badge}
              </span>
            )}
          </Button>
        ))}
      </div>

      {getTabContent()}
    </div>
  );
}
