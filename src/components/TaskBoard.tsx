
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { addTask, toggleTask, updateTask } from '../store/tasksSlice';
import { Task } from '../store/tasksSlice';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import TaskStats from './TaskStats';
import TaskFilters from './TaskFilters';
import { useToast } from '../hooks/use-toast';

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const { tasks, filter, sortBy, searchQuery } = useSelector((state: RootState) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredAndSortedTasks = useMemo(() => {
    let userTasks = tasks.filter(task => task.userId === user?.id);

    // Apply search filter
    if (searchQuery) {
      userTasks = userTasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === 'pending') {
      userTasks = userTasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      userTasks = userTasks.filter(task => task.completed);
    } else if (filter === 'overdue') {
      userTasks = userTasks.filter(task => 
        !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
      );
    }

    // Apply sorting
    userTasks.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        
        case 'title':
          return a.title.localeCompare(b.title);
        
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return userTasks;
  }, [tasks, user?.id, filter, sortBy, searchQuery]);

  const pendingTasks = filteredAndSortedTasks.filter(task => !task.completed);
  const completedTasks = filteredAndSortedTasks.filter(task => task.completed);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: any) => {
    if (editingTask) {
      dispatch(updateTask({
        id: editingTask.id,
        updates: taskData
      }));
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      });
    } else {
      dispatch(addTask({
        ...taskData,
        userId: user?.id || '',
        completed: false,
      }));
      toast({
        title: "Task created",
        description: "Your new task has been added to the board.",
      });
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTask(taskId));
    const task = tasks.find(t => t.id === taskId);
    toast({
      title: task?.completed ? "Task marked as pending" : "Task completed",
      description: task?.completed ? "Task moved back to pending." : "Great job! Task marked as completed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-800/50 backdrop-blur-md border-b border-white/20 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">TaskBoard Pro</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white/30"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`;
                }}
              />
              <div className="hidden sm:block">
                <p className="text-white font-medium">{user?.username}</p>
                <p className="text-white/70 text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Stats */}
        <TaskStats />

        {/* Filters */}
        <TaskFilters />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Task List Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  {filter === 'all' ? 'All Tasks' : 
                   filter === 'pending' ? 'Pending Tasks' :
                   filter === 'completed' ? 'Completed Tasks' : 'Overdue Tasks'}
                </h2>
                <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {filteredAndSortedTasks.length}
                </span>
              </div>
              <button
                onClick={handleAddTask}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>

          {/* Task List Content */}
          <div className="p-6 space-y-4 min-h-[400px]">
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div>
                {filter === 'all' && (
                  <h3 className="text-white/80 font-medium mb-4 flex items-center space-x-2">
                    <span>Pending Tasks</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">
                      {pendingTasks.length}
                    </span>
                  </h3>
                )}
                <div className="space-y-3">
                  <AnimatePresence>
                    {pendingTasks.map((task, index) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onEdit={handleEditTask}
                        delay={index * 0.05}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && filter === 'all' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <h3 className="text-green-300 font-medium mb-4 flex items-center space-x-2">
                  <span>Completed Tasks</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                    {completedTasks.length}
                  </span>
                </h3>
                <div className="space-y-3">
                  <AnimatePresence>
                    {completedTasks.map((task, index) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onEdit={handleEditTask}
                        delay={index * 0.05}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Show completed tasks for completed filter */}
            {filter === 'completed' && (
              <div className="space-y-3">
                <AnimatePresence>
                  {completedTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onEdit={handleEditTask}
                      delay={index * 0.05}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Empty State */}
            {filteredAndSortedTasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white/50" />
                </div>
                <p className="text-white/60 text-lg">
                  {searchQuery ? 'No tasks match your search' : 'No tasks yet'}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {searchQuery ? 'Try adjusting your search terms' : 'Click "Add Task" to get started!'}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Add Button (Mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center sm:hidden z-40"
      >
        <Plus className="w-7 h-7 text-white" />
      </motion.button>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default TaskBoard;
