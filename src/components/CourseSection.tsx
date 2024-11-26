import { useState } from 'react';
import { CheckCircle, XCircle, BookOpen, Clock, Award } from 'lucide-react';
import validCodesCSV from '../data/valid-codes.csv?raw';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';

export default function CourseSection() {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const validateCode = () => {
    const codes = validCodesCSV
      .split('\n')
      .slice(1) // Skip header
      .map(code => code.trim());
    
    const valid = codes.includes(code.trim());
    setIsValid(valid);
    if (valid) {
      setTimeout(() => {
        setIsModalOpen(false);
        setShowVideo(true);
      }, 1500);
    }
  };

  const handleVideoComplete = () => {
    setVideoCompleted(true);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  const handleGetCertificate = () => {
    const certificateContent = `
      This is to certify that you have successfully completed
      the AI & Prompt Engineering Masterclass.
      
      Course completion requirements met:
      - Video content completed
      - Assessment passed with minimum 70% score
      
      Date: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-course-certificate.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="course" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Overview</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive training in AI and prompt engineering, designed by industry experts
            from Google Developer Group and AWS Community.
          </p>
        </div>

        {showVideo ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <VideoPlayer 
              videoId="dQw4w9WgXcQ"
              onComplete={handleVideoComplete} 
            />
            {videoCompleted && !quizCompleted && (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Quiz</h3>
                  <p className="text-gray-600">
                    Complete the quiz with at least 70% correct answers to receive your certificate.
                  </p>
                </div>
                <Quiz onComplete={handleQuizComplete} />
              </>
            )}
            {quizCompleted && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleGetCertificate}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold
                           hover:bg-green-700 transition-colors"
                >
                  Get Certificate
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
                alt="AI Course"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI & Prompt Engineering Masterclass
                </h3>
                <div className="space-y-4 mb-6">
                  {[
                    { icon: <BookOpen className="w-5 h-5" />, text: "12 Comprehensive Modules" },
                    { icon: <Clock className="w-5 h-5" />, text: "40 Hours of Content" },
                    { icon: <Award className="w-5 h-5" />, text: "Industry-Recognized Certificate" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-700">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-purple-700 font-medium">Click to start learning →</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What You'll Learn</h3>
              {[
                "Understanding AI fundamentals and applications",
                "Mastering prompt engineering techniques",
                "Building AI-powered solutions",
                "Real-world project implementation",
                "Best practices and ethical considerations",
                "Integration with popular AI platforms"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Enter Registration Code</h4>
              <p className="text-gray-600 mb-6">
                Please enter your 6-character registration code to access the course.
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code (e.g., ABC123)"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                maxLength={6}
              />
              {isValid !== null && (
                <div className={`flex items-center space-x-2 mb-4 ${
                  isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isValid ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Valid code! Loading your course...</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Invalid code. Please try again.</span>
                    </>
                  )}
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={validateCode}
                  className="flex-1 bg-purple-700 text-white py-2 rounded-lg font-semibold
                           hover:bg-purple-800 transition-colors"
                >
                  Validate
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCode('');
                    setIsValid(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold
                           hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}