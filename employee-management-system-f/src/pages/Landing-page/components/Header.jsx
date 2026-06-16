import { Users } from 'lucide-react';
import Button from '../../../components/Button';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Users className="size-6" />
            </div>
            <span className="font-semibold text-gray-900">EmployeeHub</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => {navigate('/sign-in')}}>Sign In</Button>
            <Button onClick={() => navigate('/get-started')}>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}