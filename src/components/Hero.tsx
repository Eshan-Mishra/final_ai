import { Bot, BookOpen, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-purple-700 to-indigo-800 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Master AI & Prompt Engineering
          </h1>
          <p className="text-xl mb-12 text-purple-100">
            Join forces with Google Developer Group and AWS Community to unlock the power of AI. 
            Learn how to leverage artificial intelligence in your daily tasks and future career.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Bot className="w-8 h-8" />,
                title: "AI Fundamentals",
                description: "Learn the core concepts of artificial intelligence and machine learning"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Practical Skills",
                description: "Hands-on experience with real-world AI applications"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community",
                description: "Join a thriving community of AI enthusiasts and professionals"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-200">{feature.description}</p>
              </div>
            ))}
          </div>
          <a href="#course" 
             className="inline-block bg-white text-purple-700 px-8 py-4 rounded-lg font-bold 
                      hover:bg-purple-100 transition-colors">
            Explore Course
          </a>
        </div>
      </div>
    </section>
  );
}