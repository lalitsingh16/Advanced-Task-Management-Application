
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../store/authSlice';
import { RootState } from '../store/store';
import { useToast } from '../hooks/use-toast';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);
  const { toast } = useToast();

  const onSubmit = (data: LoginFormData) => {
    console.log('Login attempt:', { email: data.email, usersCount: users.length });
    
    const user = users.find(u => u.email === data.email && u.password === data.password);
    
    if (user) {
      dispatch(login({ email: data.email, password: data.password }));
      toast({
        title: "Login successful!",
        description: "Welcome back to TaskBoard.",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Log in!
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-white/90 text-sm font-medium text-center mb-2">
              Email Address
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="abcd@gmail.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-white/90 text-sm font-medium text-center mb-2">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="mr-2 rounded"
              />
              <span className="text-white/90 text-sm">Remember me</span>
            </label>
            <button
              type="button"
              className="text-white/90 text-sm hover:text-white transition-colors"
            >
              Forgot Password?
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Log in
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6"
        >
          <span className="text-white/90">Don't have an account? </span>
          <button
            onClick={onSwitchToSignup}
            className="text-white font-semibold hover:underline"
          >
            Sign up
          </button>
        </motion.div>
        
        <div className="text-center mt-4 text-white/60 text-xs">
          Registered users: {users.length}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
