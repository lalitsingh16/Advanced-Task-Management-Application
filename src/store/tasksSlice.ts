
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
  userId: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'completed' | 'overdue';
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  searchQuery: string;
  categories: string[];
}

const defaultCategories = ['Work', 'Personal', 'Shopping', 'Health', 'Education'];

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('taskboard_tasks') || '[]'),
  filter: 'all',
  sortBy: 'dueDate',
  searchQuery: '',
  categories: JSON.parse(localStorage.getItem('taskboard_categories') || JSON.stringify(defaultCategories)),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        subtasks: action.payload.subtasks || [],
      };
      state.tasks.push(newTask);
      localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
    },
    duplicateTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        const duplicatedTask: Task = {
          ...task,
          id: Date.now().toString(),
          title: `${task.title} (Copy)`,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        state.tasks.push(duplicatedTask);
        localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'pending' | 'completed' | 'overdue'>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'priority' | 'createdAt' | 'title'>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
        localStorage.setItem('taskboard_categories', JSON.stringify(state.categories));
      }
    },
    toggleSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string }>) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        const subtask = task.subtasks.find(st => st.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
        }
      }
    },
    addSubtask: (state, action: PayloadAction<{ taskId: string; title: string }>) => {
      const { taskId, title } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        const newSubtask: Subtask = {
          id: Date.now().toString(),
          title,
          completed: false,
        };
        task.subtasks.push(newSubtask);
        localStorage.setItem('taskboard_tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { 
  addTask, 
  toggleTask, 
  updateTask, 
  deleteTask, 
  duplicateTask,
  setFilter, 
  setSortBy, 
  setSearchQuery, 
  addCategory,
  toggleSubtask,
  addSubtask
} = tasksSlice.actions;
export default tasksSlice.reducer;
