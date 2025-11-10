
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, Users, MapPin, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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

export default function ClassCard({ cls, index, isTeacher, onMarkAttendance, onDeleteClass }) {
  const attendanceStatus = cls.attendance ? cls.attendance[cls.students[0]] : null; // simplified for student view

  return (
    <motion.div
      key={cls.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-white">{cls.subject}</h3>
              <Badge
                variant={cls.status === 'completed' ? 'default' : 'secondary'}
                className={cls.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}
              >
                {cls.status}
              </Badge>
            </div>
            {!isTeacher && <p className="text-purple-200 mb-3">Teacher: {cls.teacher || 'Shatabdee Bala'}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-purple-200">
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{cls.date}</div>
              <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />{cls.time} ({cls.duration}min)</div>
              <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{cls.location}</div>
              {isTeacher ? (
                <div className="flex items-center"><Users className="h-4 w-4 mr-2" />{cls.students.length} students</div>
              ) : (
                <div className="flex items-center">
                  {getAttendanceIcon(attendanceStatus)}
                  <span className={`ml-2 capitalize ${getAttendanceColor(attendanceStatus)}`}>
                    {cls.status === 'completed' ? (attendanceStatus || 'Not Marked') : 'Pending'}
                  </span>
                </div>
              )}
            </div>
          </div>
          {isTeacher && (
            <div className="flex space-x-2">
              {cls.status === 'scheduled' && (
                <Button size="sm" onClick={() => onMarkAttendance(cls.id)} className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Attendance
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: "🚧 Feature Coming Soon!", description: "Class editing will be available soon! 🚀" })}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDeleteClass(cls.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
