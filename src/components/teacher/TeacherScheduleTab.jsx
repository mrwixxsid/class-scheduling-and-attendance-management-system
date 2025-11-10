
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ClassCard from '@/components/ClassCard';

export default function TeacherScheduleTab({ classes, onMarkAttendance, onDeleteClass, setShowCreateModal }) {
  return (
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
        {classes.length > 0 ? (
          classes
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((cls, index) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                index={index}
                isTeacher={true}
                onMarkAttendance={onMarkAttendance}
                onDeleteClass={onDeleteClass}
              />
            ))
        ) : (
          <div className="text-center py-10 bg-white/5 rounded-lg">
            <h3 className="text-xl font-semibold text-white">No classes scheduled yet.</h3>
            <p className="text-purple-200 mt-2">Click "Create Class" to get started!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
