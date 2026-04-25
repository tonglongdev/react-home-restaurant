import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">Quán Tình</span>
            <div className="space-x-8 hidden md:flex">
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Home</a>
              <a href="#menu" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Menu</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Contact</a>
            </div>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Book a Table
            </button>
          </nav>
        </header>

        <main className="pt-16">
          <Hero />
          <Menu />
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
