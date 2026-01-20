
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  profileImage: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: UserWithPassword[];
}

// Helper function to safely get data from localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
};

const initialState: AuthState = {
  user: getFromLocalStorage('taskboard_current_user', null),
  isAuthenticated: !!getFromLocalStorage('taskboard_current_user', null),
  users: getFromLocalStorage('taskboard_users', []),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<{ username: string; email: string; password: string }>) => {
      const { username, email, password } = action.payload;
      
      // Check if user already exists
      const existingUser = state.users.find(u => u.email === email);
      if (existingUser) {
        return; // Don't create duplicate users
      }
      
      const userId = Date.now().toString();
      const profileImage = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`;
      
      const newUser: User = {
        id: userId,
        username,
        email,
        profileImage,
      };

      const userWithPassword: UserWithPassword = { ...newUser, password };
      state.users.push(userWithPassword);
      
      try {
        localStorage.setItem('taskboard_users', JSON.stringify(state.users));
        localStorage.setItem('taskboard_current_user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      state.user = newUser;
      state.isAuthenticated = true;
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        state.user = userWithoutPassword;
        state.isAuthenticated = true;
        
        try {
          localStorage.setItem('taskboard_current_user', JSON.stringify(userWithoutPassword));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      try {
        localStorage.removeItem('taskboard_current_user');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    loadUser: (state) => {
      try {
        const savedUser = localStorage.getItem('taskboard_current_user');
        if (savedUser) {
          state.user = JSON.parse(savedUser);
          state.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { signup, login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
