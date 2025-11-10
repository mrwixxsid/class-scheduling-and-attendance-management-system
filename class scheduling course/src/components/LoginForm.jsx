
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function LoginForm({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock login - in real app, this would validate credentials
    const userData = {
      id: selectedRole === 'teacher' ? 'teacher_1' : 'student_1',
      name: selectedRole === 'teacher' ? ' Shatabdee Bala' : 'Imran',
      email: formData.email || (selectedRole === 'teacher' ? 'balashatabdee@gmail.com' : 'me@mrwixxsid.com'),
      role: selectedRole
    };
    
    onLogin(userData);
  };

  const demoCredentials = {
    teacher: { email: 'teacher@demo.com', password: 'demo123' },
    student: { email: 'student@demo.com', password: 'demo123' }
  };

  const fillDemoCredentials = () => {
    setFormData(demoCredentials[selectedRole]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
          >
            <GraduationCap className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-purple-200">Sign in to your account</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="text-white mb-3 block">Select Role</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={selectedRole === 'teacher' ? 'default' : 'outline'}
              onClick={() => setSelectedRole('teacher')}
              className={`h-12 ${selectedRole === 'teacher' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Teacher
            </Button>
            <Button
              type="button"
              variant={selectedRole === 'student' ? 'default' : 'outline'}
              onClick={() => setSelectedRole('student')}
              className={`h-12 ${selectedRole === 'student' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Student
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium h-12"
          >
            Sign In
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={fillDemoCredentials}
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            Use Demo Credentials
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-purple-200 text-sm">
            Demo credentials are automatically filled when you click the demo button
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
