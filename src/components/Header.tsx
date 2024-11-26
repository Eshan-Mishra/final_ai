import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8" />
          <span className="text-xl font-bold">AI Course Hub</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#home" className="hover:text-purple-200 transition-colors">Home</a>
          <a href="#course" className="hover:text-purple-200 transition-colors">Course</a>
        </div>
      </nav>
    </header>
  );
}