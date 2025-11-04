'use client';

import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { QUIZ_INJURIES } from '../../data/injuries';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export function QuizModal({ isOpen, onClose, onOpenOrderModal }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'warning'>('success');
  const [selectedInjury, setSelectedInjury] = useState<string | null>(null);


  const handleReset = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowResult(false);
    setResultType('success');
    setSelectedInjury(null);
  };

  const selectInjury = (injury: string | null) => {
    setSelectedInjury(injury);
    setAnswers({ ...answers, q1: injury || 'other' });
    setCurrentQuestion(2);
  };

  const selectAnswer = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });

    if (question === 'q2') {
      if (answer === 'needs-assist') {
        showWarning('balance');
      } else {
        setCurrentQuestion(3);
      }
    } else if (question === 'q3') {
      if (answer === 'cannot-bend') {
        showWarning('knee-bend');
      } else {
        setCurrentQuestion(4);
      }
    } else if (question === 'q4') {
      showSuccess(answer);
    }
  };

  const showWarning = (_type: 'balance' | 'knee-bend') => {
    setResultType('warning');
    setShowResult(true);
  };

  const showSuccess = (_priority: string) => {
    setResultType('success');
    setShowResult(true);
  };

  const getResultContent = () => {
    if (resultType === 'warning') {
      if (answers.q2 === 'needs-assist') {
        return {
          title: '⚕️ Please consult your doctor',
          message:
            'The Freedom Leg requires good balance and core strength. Since you mentioned using a walker or cane before your injury, we strongly recommend consulting with your doctor or physical therapist before ordering. They can help determine if this device is safe for you, or recommend alternatives that may be a better fit.',
          image: '',
        };
      } else {
        return {
          title: '⚕️ Please consult your doctor',
          message:
            'The Freedom Leg requires you to bend your knee at least 20 degrees to properly secure the brace and distribute weight safely. Please consult with your doctor or physical therapist to ensure your knee mobility is sufficient.',
          image: '',
        };
      }
    } else {
      const injuryPrefix = selectedInjury
        ? `Great fit for ${selectedInjury}! `
        : 'Great fit for your injury! ';
      const messages: Record<string, { text: string; image: string }> = {
        hands: {
          text: 'The Freedom Leg keeps both hands completely free - perfect for carrying items, using your phone, or holding onto railings for extra stability.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/use-freedom-leg-brace.jpg',
        },
        stairs: {
          text: 'You can safely navigate stairs with the Freedom Leg with both hands free to hold onto the railings.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_3.png',
        },
        active: {
          text: 'Stay as active as you want! Walk, do chores, go to work - the Freedom Leg gives you the independence to keep living your normal life.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
        },
        outdoor: {
          text: 'Freedom Leg works great on all terrain - grass, gravel, uneven surfaces. Take it anywhere you need to go!',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Lee_Partyka.jpg',
        },
      };

      const result = messages[answers.q4] || messages.hands;
      const benefitText = result.text;

      return {
        title: '✅ Great fit!',
        message: injuryPrefix + benefitText,
        image: result.image,
      };
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleOrderClick = () => {
    handleReset();
    onClose();
    onOpenOrderModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} progressStep="Explore">
      <ModalBody>
        {currentQuestion === 1 && !showResult && (
          <div className="mb-6">
            <h3 className="text-[1.1em] lg:text-[1.3em] mb-5 text-[#333]">
              What type of injury do you have?
            </h3>
            <div className="flex flex-col gap-3">
              {QUIZ_INJURIES.map((injury, index) => (
                <button
                  key={index}
                  onClick={() => selectInjury(injury)}
                  className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
                >
                  {injury}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion === 2 && !showResult && (
          <div className="mb-6">
            <h3 className="text-[1.1em] lg:text-[1.3em] mb-5 text-[#333]">
              Before your injury, did you have good balance without the need for a cane or walker?
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => selectAnswer('q2', 'good-balance')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Yes, I had good balance without assistance
              </button>
              <button
                onClick={() => selectAnswer('q2', 'needs-assist')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                No, I needed a cane or walker
              </button>
            </div>
          </div>
        )}

        {currentQuestion === 3 && !showResult && (
          <div className="mb-6">
            <h3 className="text-[1.1em] lg:text-[1.3em] mb-5 text-[#333]">
              Can you bend your knee 20 degrees and tolerate moderate pressure on your shin?
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => selectAnswer('q3', 'can-bend')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Yes, I can bend my knee comfortably
              </button>
              <button
                onClick={() => selectAnswer('q3', 'cannot-bend')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                No, I have limited knee mobility
              </button>
            </div>
          </div>
        )}

        {currentQuestion === 4 && !showResult && (
          <div className="mb-6">
            <h3 className="text-[1.1em] lg:text-[1.3em] mb-5 text-[#333]">What matters most to you?</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => selectAnswer('q4', 'hands')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Keeping my hands free
              </button>
              <button
                onClick={() => selectAnswer('q4', 'stairs')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Being able to use stairs
              </button>
              <button
                onClick={() => selectAnswer('q4', 'active')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Staying active/independent
              </button>
              <button
                onClick={() => selectAnswer('q4', 'outdoor')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-250 text-sm lg:text-base text-left hover:bg-[#ccfbf1] hover:border-[#0f766e]"
              >
                Going outdoors safely
              </button>
            </div>
          </div>
        )}

        {showResult && (
          <div className="text-center p-5">
            <h3
              className={`text-[1.2em] lg:text-[1.5em] mb-[15px] ${
                resultType === 'warning' ? 'text-[#ff9800]' : 'text-[#0f766e]'
              }`}
            >
              {getResultContent().title}
            </h3>
            {getResultContent().image && (
              <img
                src={getResultContent().image}
                alt="Freedom Leg"
                className="w-full max-w-[400px] h-auto rounded-lg mb-5 mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              />
            )}
            <p className="text-[0.95em] lg:text-[1.1em] leading-[1.6] mb-6">{getResultContent().message}</p>
          </div>
        )}
      </ModalBody>
      {showResult && (
        <ModalFooter>
          <button
            onClick={handleOrderClick}
            className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e]"
          >
            Find my size
          </button>
        </ModalFooter>
      )}
    </Modal>
  );
}
