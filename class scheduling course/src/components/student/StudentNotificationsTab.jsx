
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function StudentNotificationsTab({ notifications, onMarkAsRead }) {

  useEffect(() => {
    onMarkAsRead();
  }, []);
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_class':
        return <Bell className="h-5 w-5 text-blue-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
        <Button
            onClick={() => toast({ title: "🚧 Feature Coming Soon!", description: "Notification settings will be available soon! 🚀" })}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
            Manage Settings
        </Button>
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-white/10 p-4 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                  <div>
                    <p className="text-white">{notif.message}</p>
                    <span className="text-purple-300 text-sm">
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 bg-white/5 rounded-lg">
            <CheckCheck className="mx-auto h-12 w-12 text-green-400" />
            <h3 className="mt-2 text-xl font-semibold text-white">All caught up!</h3>
            <p className="mt-1 text-purple-200">You have no new notifications.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
