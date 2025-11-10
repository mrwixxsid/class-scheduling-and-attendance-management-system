
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function TeacherAnalyticsTab({ classes }) {
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

    const allStudents = new Set(classes.flatMap(c => c.students));

    return {
      totalCompletedClasses: completedClasses.length,
      attendanceRate: totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0,
      totalEnrolledStudents: allStudents.size
    };
  };

  const stats = getAttendanceStats();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
      
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Attendance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-green-400">{stats.attendanceRate}%</div>
            <div className="text-purple-200">Overall Attendance</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.totalCompletedClasses}</div>
            <div className="text-purple-200">Classes Completed</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-purple-400">{stats.totalEnrolledStudents}</div>
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
  );
}
