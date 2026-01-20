
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { signup } from '../store/authSlice';
import { RootState } from '../store/store';
import { useToast } from '../hooks/use-toast';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);
  const { toast } = useToast();
  
  const acceptTerms = watch('acceptTerms');

  const onSubmit = (data: SignupFormData) => {
    if (!data.acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      toast({
        title: "Account exists",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      return;
    }

    console.log('Signup attempt:', { email: data.email, username: data.username });

    dispatch(signup({ 
      username: data.username, 
      email: data.email, 
      password: data.password 
    }));
    
    toast({
      title: "Account created!",
      description: "Welcome to TaskBoard. You're now logged in.",
    });
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
          Sign up
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-white/90 text-sm font-medium text-center mb-2">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              placeholder="Enter Name"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            {errors.username && (
              <p className="text-red-300 text-sm mt-1">{errors.username.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
            transition={{ delay: 0.5 }}
          >
            <label className="block text-white/90 text-sm font-medium text-center mb-2">
              Password
            </label>
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
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
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <input
                {...register('acceptTerms', { required: 'You must accept the terms and conditions' })}
                type="checkbox"
                className={`mr-3 rounded h-4 w-4 ${
                  errors.acceptTerms 
                    ? 'border-red-400 focus:ring-red-400' 
                    : 'border-white/30 focus:ring-white/50'
                }`}
              />
              <span className={`text-sm ${
                errors.acceptTerms ? 'text-red-300' : 'text-white/90'
              }`}>
                I accept the terms & conditions
              </span>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-300 text-sm">{errors.acceptTerms.message}</p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all shadow-lg ${
              acceptTerms 
                ? 'bg-white text-blue-700 hover:bg-gray-100' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            Sign up
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <span className="text-white/90">Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-white font-semibold hover:underline"
          >
            Log in
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;