import Header from './components/Header';
import Hero from './components/Hero';
import CourseSection from './components/CourseSection';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CourseSection />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 AI Course Hub. A collaboration between Google Developer Group and AWS Community.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;