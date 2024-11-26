import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of prompt engineering in AI?",
    options: [
      "Writing code for AI models",
      "Crafting effective inputs to get desired outputs",
      "Building neural networks",
      "Managing server infrastructure"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which term describes AI's ability to understand and generate human language?",
    options: [
      "Natural Language Processing (NLP)",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "What is a 'token' in the context of AI language models?",
    options: [
      "A cryptocurrency unit",
      "A security key",
      "A piece of text or word fragment",
      "A programming variable"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which is NOT a common type of AI model?",
    options: [
      "Generative AI",
      "Predictive AI",
      "Telepathic AI",
      "Classification AI"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is 'few-shot learning' in AI?",
    options: [
      "Training with minimal examples",
      "Quick model deployment",
      "Rapid prototyping",
      "Fast computation"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Which factor is most important in prompt engineering?",
    options: [
      "Code length",
      "Clarity and specificity",
      "Processing speed",
      "Memory usage"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is a 'hallucination' in AI terms?",
    options: [
      "A visual glitch",
      "Generated content that's false or nonsensical",
      "System crash",
      "Memory overflow"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Which best describes 'supervised learning'?",
    options: [
      "Learning without labels",
      "Learning with labeled data",
      "Self-directed learning",
      "Reinforcement learning"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the purpose of 'temperature' in AI text generation?",
    options: [
      "Control CPU heat",
      "Manage memory usage",
      "Control response randomness",
      "Adjust processing speed"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which is a key ethical consideration in AI?",
    options: [
      "Maximum processing speed",
      "Bias and fairness",
      "Code efficiency",
      "Storage optimization"
    ],
    correctAnswer: 1
  }
];

interface QuizProps {
  onComplete: () => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowError(false);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      setShowError(true);
      return;
    }

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 7; // 70% passing threshold

    if (passed) {
      onComplete();
    }

    return (
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
        <div className="flex items-center justify-center space-x-2 text-xl mb-4">
          {passed ? (
            <>
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-green-600">Congratulations! You passed!</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-600">Please try again to get your certificate.</span>
            </>
          )}
        </div>
        <p className="text-lg mb-4">Your score: {score} out of {questions.length}</p>
        {!passed && (
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setShowResults(false);
              setSelectedOption(null);
            }}
            className="bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold
                     hover:bg-purple-800 transition-colors"
          >
            Retry Quiz
          </button>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Question {currentQuestion + 1}</h3>
          <span className="text-gray-600">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <p className="text-lg mb-4">{question.question}</p>
        {showError && (
          <p className="text-red-500 mb-2">Please select an answer before continuing.</p>
        )}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleAnswer(index)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors
                ${selectedOption === index 
                  ? 'border-purple-700 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'}`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold
                 hover:bg-purple-800 transition-colors"
      >
        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
}