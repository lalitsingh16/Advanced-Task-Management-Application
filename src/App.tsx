
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store, RootState } from './store/store';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import TaskBoard from './components/TaskBoard';

const AppContent: React.FC = () => {
  useAuth();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [showSignup, setShowSignup] = useState(false);

  if (isAuthenticated) {
    return <TaskBoard />;
  }

  return showSignup ? (
    <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </Provider>
  );
};

export default App;
