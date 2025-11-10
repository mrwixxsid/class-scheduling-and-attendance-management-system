
import React from 'react';
import { motion } from 'framer-motion';
import ClassCard from '@/components/ClassCard';

export default function StudentScheduleTab({ classes }) {
  const today = new Date().toISOString().split('T')[0];
  const todayClasses = classes.filter(c => c.date === today);
  const upcomingClasses = classes.filter(c => c.date > today && c.status === 'scheduled');
  const pastClasses = classes.filter(c => c.date < today);

  const renderClassList = (title, classArray) => (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {classArray.length > 0 ? (
        <div className="grid gap-4">
          {classArray
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((cls, index) => (
              <ClassCard key={cls.id} cls={cls} index={index} isTeacher={false} />
            ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-white/5 rounded-lg">
          <p className="text-purple-200">No classes in this category.</p>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-white">My Class Schedule</h2>
      
      {renderClassList("Today's Classes", todayClasses)}
      {renderClassList("Upcoming Classes", upcomingClasses)}
      {renderClassList("Past Classes", pastClasses)}

    </motion.div>
  );
}
