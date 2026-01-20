
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Edit, Trash2, Copy, MoreVertical, Calendar, Flag, CheckCircle } from 'lucide-react';
import { Task } from '../store/tasksSlice';
import { deleteTask, duplicateTask, toggleSubtask } from '../store/tasksSlice';
import { useToast } from '../hooks/use-toast';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  delay?: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, delay = 0 }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast({
      title: "Task deleted",
      description: "The task has been permanently removed.",
    });
  };

  const handleDuplicate = () => {
    dispatch(duplicateTask(task.id));
    toast({
      title: "Task duplicated",
      description: "A copy of the task has been created.",
    });
  };

  const handleSubtaskToggle = (subtaskId: string) => {
    dispatch(toggleSubtask({ taskId: task.id, subtaskId }));
  };

  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay }}
      className={`relative group rounded-lg border transition-all hover:bg-white/5 ${
        task.completed 
          ? 'bg-green-500/10 border-green-400/30' 
          : isOverdue()
          ? 'bg-red-500/10 border-red-400/30'
          : 'bg-white/5 border-white/20'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-white/40 hover:border-white/60'
            }`}
          >
            {task.completed && (
              <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-medium transition-all ${
                    task.completed 
                      ? 'text-green-300 line-through' 
                      : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {/* Priority Flag */}
                  <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                  
                  {/* Category Badge */}
                  <span className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full">
                    {task.category}
                  </span>
                </div>
                
                {task.description && (
                  <p className={`text-sm mt-1 transition-all ${
                    task.completed 
                      ? 'text-green-200/60' 
                      : 'text-white/70'
                  }`}>
                    {task.description}
                  </p>
                )}
                
                {/* Subtasks Progress */}
                {totalSubtasks > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-white/60">
                        {completedSubtasks}/{totalSubtasks} subtasks
                      </span>
                      <div className="flex-1 bg-white/10 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Due Date */}
                {task.dueDate && (
                  <div className="flex items-center mt-2 space-x-2">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className={`text-sm ${
                      task.completed 
                        ? 'text-green-200/60' 
                        : isOverdue()
                        ? 'text-red-300'
                        : 'text-white/60'
                    }`}>
                      {formatDate(task.dueDate)}
                      {isOverdue() && !task.completed && (
                        <span className="ml-1 text-red-400 font-medium">(Overdue)</span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-2 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border z-10 min-w-[160px]"
                    onMouseLeave={() => setShowActions(false)}
                  >
                    <button
                      onClick={() => { onEdit(task); setShowActions(false); }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => { handleDuplicate(); setShowActions(false); }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={() => { handleDelete(); setShowActions(false); }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Subtasks List */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="mt-3 space-y-1 pl-2">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSubtaskToggle(subtask.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        subtask.completed
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-white/30 hover:border-white/50'
                      }`}
                    >
                      {subtask.completed && (
                        <CheckCircle className="w-3 h-3 text-white" fill="currentColor" />
                      )}
                    </button>
                    <span className={`text-sm ${
                      subtask.completed 
                        ? 'text-white/50 line-through' 
                        : 'text-white/70'
                    }`}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
