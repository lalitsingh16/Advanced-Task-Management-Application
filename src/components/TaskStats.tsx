
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { RootState } from '../store/store';

const TaskStats: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const userTasks = tasks.filter(task => task.userId === user?.id);
  const completedTasks = userTasks.filter(task => task.completed);
  const pendingTasks = userTasks.filter(task => !task.completed);
  const overdueTasks = userTasks.filter(task => 
    !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
  );
  const todayTasks = userTasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  const stats = [
    {
      title: 'Total Tasks',
      value: userTasks.length,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      title: 'Pending',
      value: pendingTasks.length,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Overdue',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">{stat.title}</p>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskStats;
