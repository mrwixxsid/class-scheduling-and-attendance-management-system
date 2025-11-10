
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

export default function StudentAttendanceTab({ classes }) {
  const completedClasses = classes.filter(c => c.status === 'completed');

  const getAttendanceStats = () => {
    const studentName = "Imran"; // Imran as default student
    const attendedClasses = completedClasses.filter(c => c.attendance[studentName] === 'present');
    const missedClasses = completedClasses.filter(c => c.attendance[studentName] === 'absent');
    const attendanceRate = completedClasses.length > 0 
      ? Math.round((attendedClasses.length / completedClasses.length) * 100) 
      : 0;

    return {
      totalCompleted: completedClasses.length,
      attended: attendedClasses.length,
      missed: missedClasses.length,
      rate: attendanceRate,
    };
  };

  const stats = getAttendanceStats();

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'absent': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'late': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'excused': return <Clock className="h-5 w-5 text-blue-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-400';
      case 'absent': return 'text-red-400';
      case 'late': return 'text-yellow-400';
      case 'excused': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">My Attendance Record</h2>
      
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg"><div className="text-3xl font-bold text-green-400">{stats.rate}%</div><div className="text-purple-200">Rate</div></div>
          <div className="text-center p-4 bg-white/5 rounded-lg"><div className="text-3xl font-bold text-blue-400">{stats.attended}</div><div className="text-purple-200">Attended</div></div>
          <div className="text-center p-4 bg-white/5 rounded-lg"><div className="text-3xl font-bold text-red-400">{stats.missed}</div><div className="text-purple-200">Missed</div></div>
          <div className="text-center p-4 bg-white/5 rounded-lg"><div className="text-3xl font-bold text-purple-400">{stats.totalCompleted}</div><div className="text-purple-200">Total</div></div>
        </div>
      </Card>

      <div className="grid gap-4">
        {completedClasses.length > 0 ? (
          completedClasses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((cls, index) => {
              const studentName = "Imran";
              const status = cls.attendance[studentName];
              return (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{cls.subject}</h4>
                        <p className="text-purple-200">{cls.date} at {cls.time} • {cls.teacher || 'Shatabdee Bala'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getAttendanceIcon(status)}
                        <span className={`font-medium capitalize ${getAttendanceColor(status)}`}>
                          {status || 'Not marked'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
        ) : (
          <div className="text-center py-10 bg-white/5 rounded-lg">
            <h3 className="text-xl font-semibold text-white">No attendance records yet.</h3>
            <p className="text-purple-200 mt-2">Your records will appear here after your teacher marks attendance.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
