
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BookOpen, TrendingUp, CheckCircle, Calendar, AlertCircle } from 'lucide-react';

export default function StudentStats({ classes }) {
  const getAttendanceStats = () => {
    const completedClasses = classes.filter(c => c.status === 'completed');
    const attendedClasses = completedClasses.filter(c => {
        const studentName = "Imran Mahmud"; // Assuming student name, should be dynamic
        return c.attendance[studentName] === 'present';
    });
    
    const attendanceRate = completedClasses.length > 0 
      ? Math.round((attendedClasses.length / completedClasses.length) * 100) 
      : 0;

    return {
      totalClasses: classes.length,
      attendedClasses: attendedClasses.length,
      attendanceRate,
    };
  };

  const stats = getAttendanceStats();
  const today = new Date().toISOString().split('T')[0];
  const todayClasses = classes.filter(c => c.date === today);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const statItems = [
    { label: "Total Classes", value: stats.totalClasses, icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { label: "Attendance Rate", value: `${stats.attendanceRate}%`, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Classes Attended", value: stats.attendedClasses, icon: CheckCircle, color: "from-purple-500 to-pink-500" },
    { label: "Today's Classes", value: todayClasses.length, icon: Calendar, color: "from-orange-500 to-red-500" }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, i) => (
          <motion.div
            key={item.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <Card className={`bg-gradient-to-r ${item.color} text-white p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">{item.label}</p>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
                <item.icon className="h-8 w-8 text-white/70" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {stats.attendanceRate < 75 && stats.attendanceRate > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 p-4 mt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <div>
                <h3 className="text-white font-semibold">Attendance Alert</h3>
                <p className="text-red-200">Your attendance rate is below 75%. Consider reaching out to your teachers.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
}
