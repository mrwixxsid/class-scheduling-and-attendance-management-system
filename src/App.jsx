import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Users, BookOpen, Bell, BarChart3, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import TeacherDashboard from '@/components/teacher/TeacherDashboard';
import StudentDashboard from '@/components/student/StudentDashboard';
import LoginForm from '@/components/LoginForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setUserRole(userData.role);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.role}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  if (!currentUser) {
    return (
      <>
        <Helmet>
          <title>Class Schedule & Attendance Tracker - Login</title>
          <meta name="description" content="Streamline class scheduling and attendance management for teachers and students" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm onLogin={handleLogin} />
          <Toaster />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Class Schedule & Attendance Tracker - Dashboard</title>
        <meta name="description" content="Manage your classes, track attendance, and stay organized with our comprehensive scheduling system" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ClassTracker</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="text-purple-300 text-sm">({userRole})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {userRole === 'teacher' ? (
            <TeacherDashboard user={currentUser} />
          ) : (
            <StudentDashboard user={currentUser} />
          )}
        </main>

        <Toaster />
      </div>
    </>
  );
}

export default App;