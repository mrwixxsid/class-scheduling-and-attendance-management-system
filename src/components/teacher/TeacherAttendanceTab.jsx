
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

export default function TeacherAttendanceTab({ classes }) {
  const completedClasses = classes.filter(c => c.status === 'completed' && Object.keys(c.attendance).length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Attendance Records</h2>
      
      <div className="grid gap-4">
        {completedClasses.length > 0 ? (
          completedClasses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{cls.subject}</h3>
                    <span className="text-purple-200">{cls.date} at {cls.time}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(cls.attendance).map(([student, status]) => (
                      <div key={student} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <span className="text-white">{student}</span>
                        <div className="flex items-center">
                          {status === 'present' && <CheckCircle className="h-5 w-5 text-green-400" />}
                          {status === 'absent' && <XCircle className="h-5 w-5 text-red-400" />}
                          {status === 'late' && <AlertCircle className="h-5 w-5 text-yellow-400" />}
                          {status === 'excused' && <Clock className="h-5 w-5 text-blue-400" />}
                          <span className={`ml-2 text-sm capitalize ${
                            status === 'present' ? 'text-green-400' :
                            status === 'absent' ? 'text-red-400' :
                            status === 'late' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>
                            {status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))
        ) : (
          <div className="text-center py-10 bg-white/5 rounded-lg">
            <h3 className="text-xl font-semibold text-white">No attendance records found.</h3>
            <p className="text-purple-200 mt-2">Complete a class and mark attendance to see records here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
