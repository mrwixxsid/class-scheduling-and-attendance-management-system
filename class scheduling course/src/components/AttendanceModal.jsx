
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export default function AttendanceModal({ class: classData, onClose, onSave }) {
  const [attendance, setAttendance] = useState(classData.attendance || {});

  const attendanceOptions = [
    { value: 'present', label: 'Present', icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20 border-green-500/30' },
    { value: 'absent', label: 'Absent', icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/20 border-red-500/30' },
    { value: 'late', label: 'Late', icon: AlertCircle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20 border-yellow-500/30' },
    { value: 'excused', label: 'Excused', icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-500/30' }
  ];

  const handleAttendanceChange = (student, status) => {
    setAttendance({
      ...attendance,
      [student]: status
    });
  };

  const handleSave = () => {
    onSave(attendance);
    onClose();
  };

  const markAllPresent = () => {
    const allPresent = {};
    classData.students.forEach(student => {
      allPresent[student] = 'present';
    });
    setAttendance(allPresent);
  };

  const getAttendanceStats = () => {
    const total = classData.students.length;
    const marked = Object.keys(attendance).length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    return { total, marked, present };
  };

  const stats = getAttendanceStats();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Mark Attendance</h2>
              <p className="text-purple-200">{classData.subject} • {classData.date} at {classData.time}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-purple-200">Total Students</div>
            </Card>
            <Card className="bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.marked}</div>
              <div className="text-purple-200">Marked</div>
            </Card>
            <Card className="bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.present}</div>
              <div className="text-purple-200">Present</div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Student Attendance</h3>
            <Button
              onClick={markAllPresent}
              className="bg-green-500 hover:bg-green-600"
            >
              Mark All Present
            </Button>
          </div>

          {/* Student List */}
          <div className="space-y-4 mb-6">
            {classData.students.map((student, index) => (
              <motion.div
                key={student}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-4 ${attendance[student] ? attendanceOptions.find(opt => opt.value === attendance[student])?.bgColor : 'bg-white/5'}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{student}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {attendanceOptions.map(({ value, label, icon: Icon, color }) => (
                        <Button
                          key={value}
                          variant={attendance[student] === value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleAttendanceChange(student, value)}
                          className={`${attendance[student] === value 
                            ? 'bg-white text-purple-600' 
                            : 'border-white/30 text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-1" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Save Attendance
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
