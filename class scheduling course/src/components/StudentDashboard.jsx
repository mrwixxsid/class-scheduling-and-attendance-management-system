
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, BarChart3, Bell, MapPin, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function StudentDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    // Load mock data for student
    const mockClasses = [
      {
        id: 1,
        subject: 'Data Structures & Algorithms',
        teacher: 'Tania Akter',
        date: '2025-11-10', // <-- Updated to today for testing
        time: '10:00',
        duration: 90,
        location: 'Room 301',
        status: 'scheduled'
      },
      {
        id: 2,
        subject: 'Software Engineering Lab',
        teacher: 'Md. Atikur Rahman',
        date: '2025-11-10', // <-- Updated to today for testing
        time: '14:00',
        duration: 120,
        location: 'Lab 205',
        status: 'scheduled'
      },
      {
        id: 3,
        subject: 'Database Management Systems',
        teacher: 'Shatabdee Bala',
        date: '2025-11-09', // <-- Updated to a recent past date
        time: '09:00',
        duration: 60,
        location: 'Room 102',
        status: 'completed'
      },
      {
        id: 4,
        subject: 'Artificial Intelligence',
        teacher: 'Roena Afroz Aenney',
        date: '2025-11-08', // <-- Updated to a recent past date
        time: '11:00',
        duration: 75,
        location: 'Room 204',
        status: 'completed'
      },
      {
        id: 5,
        subject: 'Computer Networks',
        teacher: 'Farzana Tasnim',
        date: '2025-11-07', // <-- Updated to a recent past date
        time: '15:30',
        duration: 90,
        location: 'Lab 301',
        status: 'completed'
      }
    ];

    const mockAttendance = {
      1: null, // Not yet attended
      2: null, // Not yet attended
      3: 'present',
      4: 'absent',
      5: 'present'
    };

    setClasses(mockClasses);
    setAttendanceData(mockAttendance);
  }, []);

  const getAttendanceStats = () => {
    const completedClasses = classes.filter(c => c.status === 'completed');
    const attendedClasses = completedClasses.filter(c => attendanceData[c.id] === 'present');
    const attendanceRate = completedClasses.length > 0 
      ? Math.round((attendedClasses.length / completedClasses.length) * 100) 
      : 0;

    return {
      totalClasses: classes.length,
      completedClasses: completedClasses.length,
      attendedClasses: attendedClasses.length,
      attendanceRate,
      missedClasses: completedClasses.filter(c => attendanceData[c.id] === 'absent').length
    };
  };

  const stats = getAttendanceStats();
  const todayClasses = classes.filter(c => c.date === new Date().toISOString().split('T')[0]);
  const upcomingClasses = classes.filter(c => new Date(c.date) > new Date() && c.status === 'scheduled');

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'excused':
        return <Clock className="h-5 w-5 text-blue-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-400';
      case 'absent':
        return 'text-red-400';
      case 'late':
        return 'text-yellow-400';
      case 'excused':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
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
                <p className="text-3xl font-bold">{stats.totalClasses}</p>
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
              <TrendingUp className="h-8 w-8 text-green-200" />
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
                <p className="text-purple-100">Classes Attended</p>
                <p className="text-3xl font-bold">{stats.attendedClasses}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-200" />
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

      {/* Attendance Alert */}
      {stats.attendanceRate < 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <div>
                <h3 className="text-white font-semibold">Attendance Alert</h3>
                <p className="text-red-200">Your attendance rate is below 75%. Consider reaching out to your teachers or counselor.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1">
        {[
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: BarChart3 },
          { id: 'notifications', label: 'Notifications', icon: Bell }
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
          <h2 className="text-2xl font-bold text-white">My Class Schedule</h2>

          {/* Today's Classes */}
          {todayClasses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Today's Classes</h3>
              <div className="grid gap-4">
                {todayClasses.map((cls, index) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-semibold text-white">{cls.subject}</h4>
                            <Badge className="bg-purple-500 text-white">Today</Badge>
                          </div>
                          <p className="text-purple-200 mb-3">Teacher: {cls.teacher}</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-purple-200">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {cls.time} ({cls.duration}min)
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {cls.location}
                            </div>
                            <div className="flex items-center">
                              {getAttendanceIcon(attendanceData[cls.id])}
                              <span className={`ml-2 ${getAttendanceColor(attendanceData[cls.id])}`}>
                                {attendanceData[cls.id] || 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Classes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">All Classes</h3>
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
                          <h4 className="text-xl font-semibold text-white">{cls.subject}</h4>
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
                        <p className="text-purple-200 mb-3">Teacher: {cls.teacher}</p>
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
                            <MapPin className="h-4 w-4 mr-2" />
                            {cls.location}
                          </div>
                          <div className="flex items-center">
                            {getAttendanceIcon(attendanceData[cls.id])}
                            <span className={`ml-2 ${getAttendanceColor(attendanceData[cls.id])}`}>
                              {attendanceData[cls.id] || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'attendance' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">My Attendance Record</h2>
          
          {/* Attendance Summary */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{stats.attendanceRate}%</div>
                <div className="text-purple-200">Attendance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.attendedClasses}</div>
                <div className="text-purple-200">Classes Attended</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{stats.missedClasses}</div>
                <div className="text-purple-200">Classes Missed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.completedClasses}</div>
                <div className="text-purple-200">Total Completed</div>
              </div>
            </div>
          </Card>

          {/* Detailed Attendance */}
          <div className="grid gap-4">
            {classes.filter(c => c.status === 'completed').map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{cls.subject}</h4>
                      <p className="text-purple-200">{cls.date} at {cls.time} • {cls.teacher}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getAttendanceIcon(attendanceData[cls.id])}
                      <span className={`font-medium ${getAttendanceColor(attendanceData[cls.id])}`}>
                        {attendanceData[cls.id] || 'Not marked'}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
              <Button
                onClick={() => toast({
                  title: "🚧 Settings Feature Coming Soon!",
                  description: "Notification preferences will be available in the next update! 🚀",
                })}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Manage Settings
              </Button>
            </div>
            <div className="space-y-3 text-purple-200">
              <div className="flex items-center justify-between">
                <span>Class reminders (15 min before)</span>
                <Badge className="bg-green-500 text-white">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Schedule changes</span>
                <Badge className="bg-green-500 text-white">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Attendance alerts</span>
                <Badge className="bg-green-500 text-white">Enabled</Badge>
              </div>
            </div>
          </Card>

          {/* Recent Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recent Notifications</h3>
            
            <Card className="bg-blue-500/20 border-blue-500/30 p-4">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Class Reminder</h4>
                  <p className="text-blue-200">Advanced Mathematics starts in 15 minutes (Room 301)</p>
                  <span className="text-blue-300 text-sm">2 hours ago</span>
                </div>
              </div>
            </Card>

            <Card className="bg-yellow-500/20 border-yellow-500/30 p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Attendance Alert</h4>
                  <p className="text-yellow-200">Your attendance rate is below 75%. Consider speaking with your counselor.</p>
                  <span className="text-yellow-300 text-sm">1 day ago</span>
                </div>
              </div>
            </Card>

            <Card className="bg-green-500/20 border-green-500/30 p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Attendance Recorded</h4>
                  <p className="text-green-200">Your attendance for Chemistry Basics has been marked as Present</p>
                  <span className="text-green-300 text-sm">2 days ago</span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
