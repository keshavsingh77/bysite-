
import React, { useState, useEffect } from 'react';

interface LinkProtectorProps {
  onComplete: () => void;
}

const LinkProtector: React.FC<LinkProtectorProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isVerifying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowGenerateBtn(true);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isVerifying, progress]);

  const handleVerify = () => {
    setIsVerifying(true);
  };

  const nextStep = () => {
    setStep(2);
  };

  if (step === 1) {
    return (
      <div className="flex flex-col items-center justify-center space-y-12 py-10 animate-in fade-in duration-500">
        {/* Step Header */}
        <div className="w-full max-w-lg border-2 border-blue-600 bg-blue-50/30 rounded-lg py-3 px-6 text-center shadow-sm">
          <p className="text-blue-800 font-bold text-lg tracking-tight">
            You are Currently On Step (1/2) From Destination.
          </p>
        </div>

        {/* Ad Instruction Box */}
        <div className="w-full max-w-md bg-zinc-800 rounded-[2rem] p-1.5 shadow-2xl border-4 border-orange-500/20">
            <div className="bg-white rounded-[1.8rem] border-2 border-black p-8 text-center space-y-4">
                <h3 className="text-xl font-black text-gray-800 tracking-tight">Thank You For Visiting Our Site</h3>
                <div className="space-y-2">
                    <p className="text-xl font-black text-gray-900">Please Click on any Ads</p>
                    <p className="text-xl font-black text-gray-900 flex items-center justify-center gap-2">
                        Above <span className="text-2xl">👆</span> Or Below <span className="text-2xl">👇</span> and
                    </p>
                    <p className="text-xl font-black text-gray-900">then Back to Continue</p>
                </div>
            </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center space-y-8 w-full">
          {!isVerifying ? (
            <button 
              onClick={handleVerify}
              className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all transform active:scale-95 text-lg"
            >
              I am not a robot
            </button>
          ) : !showGenerateBtn ? (
            <div className="relative flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (progress / 100) * 364}
                  className="text-blue-600 transition-all duration-100 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-black text-gray-400">{progress}%</span>
            </div>
          ) : (
            <button 
              onClick={nextStep}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-black py-5 px-16 rounded-[2rem] shadow-xl shadow-indigo-200 transition-all transform active:scale-95 text-xl uppercase tracking-widest"
            >
              GENERATE LINK
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10 animate-in slide-in-from-bottom-10 duration-700">
      {/* Step Header */}
      <div className="w-full max-w-lg border-2 border-blue-600 bg-blue-50/30 rounded-lg py-3 px-6 text-center shadow-sm">
        <p className="text-blue-800 font-bold text-lg tracking-tight">
          You are Currently on Step (2/2) From Destination.
        </p>
      </div>

      {/* Oval Instruction Box */}
      <div className="w-full max-w-2xl border-4 border-black rounded-[5rem] py-16 px-10 text-center shadow-md bg-blue-50/20">
        <p className="text-2xl font-black text-gray-700 leading-relaxed">
          Click on Image <span className="mx-1">👇</span> <span className="mx-1">👇</span> and back to
          <br />
          Continue
        </p>
      </div>

      <div className="text-center space-y-12 w-full">
        <p className="text-2xl font-black text-gray-800 tracking-tight">
          Scroll down & click on <span className="text-green-600">Continue</span> button for your destination link
        </p>

        {/* Spacer to simulate scrolling need */}
        <div className="h-24"></div>

        <button 
          onClick={onComplete}
          className="bg-violet-600 hover:bg-violet-700 text-white font-black py-5 px-16 rounded-[2rem] shadow-xl shadow-violet-200 transition-all transform active:scale-95 text-xl capitalize"
        >
          Generate link
        </button>
      </div>
    </div>
  );
};

export default LinkProtector;
