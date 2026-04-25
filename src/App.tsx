import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { User as UserIcon, LogOut } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-600">Quán Tình</span>
              
              <div className="space-x-8 hidden md:flex">
                <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Home</a>
                <a href="#menu" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Menu</a>
                <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">About</a>
              </div>

              <AuthStatus onOpenAuth={() => setIsAuthOpen(true)} />
            </nav>
          </header>

          <main className="pt-16">
            <Hero />
            <Menu />
          </main>
          <Footer />
          
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const AuthStatus = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const { user, logout } = useAuth();
  
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
          <UserIcon size={18} />
          <span className="font-medium text-sm">{user.name || user.email}</span>
        </div>
        <button 
          onClick={logout}
          className="text-gray-500 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={onOpenAuth}
      className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
    >
      Sign In
    </button>
  );
};

export default App;
