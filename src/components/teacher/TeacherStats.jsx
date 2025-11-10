
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BookOpen, BarChart3, Users, Calendar } from 'lucide-react';

export default function TeacherStats({ classes }) {
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
      totalClasses: completedClasses.length,
      attendanceRate: totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0,
      totalEnrolledStudents: allStudents.size
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
    { label: "Total Classes", value: classes.length, icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { label: "Attendance Rate", value: `${stats.attendanceRate}%`, icon: BarChart3, color: "from-green-500 to-emerald-500" },
    { label: "Total Students", value: stats.totalEnrolledStudents, icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "Today's Classes", value: todayClasses.length, icon: Calendar, color: "from-orange-500 to-red-500" }
  ];

  return (
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
  );
}
