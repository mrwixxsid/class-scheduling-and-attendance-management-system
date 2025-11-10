
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, Clock, BookOpen, BarChart3, Bell, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import CreateClassModal from '@/components/CreateClassModal';
import AttendanceModal from '@/components/AttendanceModal';

export default function TeacherDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    // Load mock data
    const mockClasses = [
      {
        id: 1,
        subject: 'Advanced Mathematics',
        date: '2025-01-15',
        time: '10:00',
        duration: 90,
        location: 'Room 301',
        students: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'],
        status: 'scheduled',
        attendance: {}
      },
      {
        id: 2,
        subject: 'Physics Lab',
        date: '2025-01-15',
        time: '14:00',
        duration: 120,
        location: 'Lab 205',
        students: ['Eve Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor'],
        status: 'scheduled',
        attendance: {}
      },
      {
        id: 3,
        subject: 'Chemistry Basics',
        date: '2025-01-14',
        time: '09:00',
        duration: 60,
        location: 'Room 102',
        students: ['Alice Johnson', 'Bob Smith', 'Eve Brown'],
        status: 'completed',
        attendance: {
          'Alice Johnson': 'present',
          'Bob Smith': 'absent',
          'Eve Brown': 'present'
        }
      }
    ];

    const savedClasses = localStorage.getItem('teacher_classes');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    } else {
      setClasses(mockClasses);
      localStorage.setItem('teacher_classes', JSON.stringify(mockClasses));
    }
  }, []);

  const saveClasses = (updatedClasses) => {
    setClasses(updatedClasses);
    localStorage.setItem('teacher_classes', JSON.stringify(updatedClasses));
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
    toast({
      title: "Class Created!",
      description: `${classData.subject} has been scheduled successfully.`,
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

  const getAttendanceStats = () => {
    const completedClasses = classes.filter(c => c.status === 'completed');
    let totalStudents = 0;
    let presentCount = 0;
    
    completedClasses.forEach(cls => {
      Object.values(cls.attendance).forEach(status => {
        totalStudents++;
        if (status === 'present') presentCount++;
      });
    });

    return {
      totalClasses: completedClasses.length,
      attendanceRate: totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0,
      totalStudents: new Set(classes.flatMap(c => c.students)).size
    };
  };

  const stats = getAttendanceStats();
  const todayClasses = classes.filter(c => c.date === new Date().toISOString().split('T')[0]);
  const upcomingClasses = classes.filter(c => new Date(c.date) > new Date() && c.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Classes</p>
                <p className="text-3xl font-bold">{classes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Attendance Rate</p>
                <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Today's Classes</p>
                <p className="text-3xl font-bold">{todayClasses.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </Card>
        </motion.div>
      </div>

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

      {/* Content based on active tab */}
      {activeTab === 'schedule' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Class Schedule</h2>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Class
            </Button>
          </div>

          <div className="grid gap-4">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{cls.subject}</h3>
                        <Badge 
                          variant={cls.status === 'completed' ? 'default' : 'secondary'}
                          className={cls.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-black'
                          }
                        >
                          {cls.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-purple-200">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {cls.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {cls.time} ({cls.duration}min)
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {cls.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {cls.students.length} students
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {cls.status === 'scheduled' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAttendance(cls.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Attendance
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast({
                          title: "🚧 Feature Coming Soon!",
                          description: "Class editing functionality will be available in the next update! 🚀",
                        })}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'attendance' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Attendance Records</h2>
          
          <div className="grid gap-4">
            {classes.filter(c => c.status === 'completed').map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{cls.subject}</h3>
                    <span className="text-purple-200">{cls.date} at {cls.time}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cls.students.map(student => {
                      const status = cls.attendance[student] || 'not-marked';
                      return (
                        <div key={student} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <span className="text-white">{student}</span>
                          <div className="flex items-center">
                            {status === 'present' && <CheckCircle className="h-5 w-5 text-green-400" />}
                            {status === 'absent' && <XCircle className="h-5 w-5 text-red-400" />}
                            {status === 'late' && <AlertCircle className="h-5 w-5 text-yellow-400" />}
                            {status === 'excused' && <Clock className="h-5 w-5 text-blue-400" />}
                            <span className={`ml-2 text-sm ${
                              status === 'present' ? 'text-green-400' :
                              status === 'absent' ? 'text-red-400' :
                              status === 'late' ? 'text-yellow-400' :
                              status === 'excused' ? 'text-blue-400' :
                              'text-gray-400'
                            }`}>
                              {status === 'not-marked' ? 'Not marked' : status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attendance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{stats.attendanceRate}%</div>
                <div className="text-purple-200">Overall Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.totalClasses}</div>
                <div className="text-purple-200">Classes Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.totalStudents}</div>
                <div className="text-purple-200">Total Students</div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Export Reports</h3>
              <Button
                onClick={() => toast({
                  title: "🚧 Export Feature Coming Soon!",
                  description: "Report export functionality will be available in the next update! 🚀",
                })}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Export CSV
              </Button>
            </div>
            <p className="text-purple-200">Generate detailed attendance reports for record-keeping and analysis.</p>
          </Card>
        </motion.div>
      )}

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
