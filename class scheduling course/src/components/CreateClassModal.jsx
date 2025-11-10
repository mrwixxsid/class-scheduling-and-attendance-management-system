import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { allStudents } from '@/data/students';

export default function CreateClassModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    time: '',
    duration: 60,
    location: '',
    students: []
  });

  const [studentInput, setStudentInput] = useState('');
  const [selectionType, setSelectionType] = useState('individual'); // 'individual' or 'range'
  const [rollRange, setRollRange] = useState({ start: '', end: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    let finalStudents = formData.students;
    if (selectionType === 'range' && rollRange.start && rollRange.end) {
      const start = parseInt(rollRange.start);
      const end = parseInt(rollRange.end);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        finalStudents = allStudents
          .filter(student => student.roll >= start && student.roll <= end)
          .map(student => student.name);
      } else {
        toast({
          title: "Invalid Range",
          description: "Please enter a valid roll number range.",
          variant: "destructive"
        });
        return;
      }
    }

    if (finalStudents.length === 0) {
       toast({
        title: "No Students",
        description: "Please add at least one student or a valid range.",
        variant: "destructive"
      });
      return;
    }

    onSave({ ...formData, students: finalStudents });
    onClose();
  };

  const addStudent = () => {
    if (studentInput.trim() && !formData.students.includes(studentInput.trim())) {
      setFormData({
        ...formData,
        students: [...formData.students, studentInput.trim()]
      });
      setStudentInput('');
    }
  };

  const removeStudent = (studentToRemove) => {
    setFormData({
      ...formData,
      students: formData.students.filter(student => student !== studentToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addStudent();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Class</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject */}
            <div>
              <Label htmlFor="subject" className="text-white">Subject *</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                  placeholder="Enter subject name"
                  required
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-white">Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="pl-10 bg-white/10 border-white/30 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="time" className="text-white">Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="pl-10 bg-white/10 border-white/30 text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Duration and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-white">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="300"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="bg-white/10 border-white/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-white">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                    placeholder="Room number or location"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Students */}
            <div>
              <Label className="text-white mb-3 block">Assign Students</Label>
              <div className="flex space-x-2 bg-white/10 p-1 rounded-lg mb-4">
                <Button
                  type="button"
                  variant={selectionType === 'individual' ? 'default' : 'ghost'}
                  onClick={() => setSelectionType('individual')}
                  className={`flex-1 ${selectionType === 'individual' ? 'bg-white text-purple-600' : 'text-white hover:bg-white/10'}`}
                >
                  Individually
                </Button>
                <Button
                  type="button"
                  variant={selectionType === 'range' ? 'default' : 'ghost'}
                  onClick={() => setSelectionType('range')}
                   className={`flex-1 ${selectionType === 'range' ? 'bg-white text-purple-600' : 'text-white hover:bg-white/10'}`}
                >
                  By Roll Range
                </Button>
              </div>

              {selectionType === 'individual' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex space-x-2 mb-3">
                    <div className="relative flex-1">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                      <Input
                        value={studentInput}
                        onChange={(e) => setStudentInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                        placeholder="Enter student name and press Add"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addStudent}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Student List */}
                  {formData.students.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {formData.students.map((student, index) => (
                          <div
                            key={index}
                            className="bg-purple-500/30 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                          >
                            <span>{student}</span>
                            <button
                              type="button"
                              onClick={() => removeStudent(student)}
                              className="text-purple-200 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {selectionType === 'range' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-roll" className="text-white">Start Roll #</Label>
                    <Input
                      id="start-roll"
                      type="number"
                      value={rollRange.start}
                      onChange={(e) => setRollRange({...rollRange, start: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                      placeholder="e.g., 1366"
                    />
                  </div>
                   <div>
                    <Label htmlFor="end-roll" className="text-white">End Roll #</Label>
                    <Input
                      id="end-roll"
                      type="number"
                      value={rollRange.end}
                      onChange={(e) => setRollRange({...rollRange, end: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                      placeholder="e.g., 1490"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Create Class
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}