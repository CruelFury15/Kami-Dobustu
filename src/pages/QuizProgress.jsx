import React from 'react';

const QuizProgress = ({ currentStep, totalQuestions }) => {
  const steps = Array.from({ length: totalQuestions });

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-black w-full">
      
      <div className="flex items-center">
        {steps.map((_, index) => {
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              
              <div
                className={`
                  relative flex items-center justify-center 
                  w-8 h-8 rounded-full border-4 transition-all duration-300
                  ${isActive 
                    ? 'border-yellow-400 shadow-[0_0_15px_2px_rgba(250,204,21,0.6)] scale-110 z-10' 
                    : 'border-gray-600 bg-black'
                  }
                `}
              >
                {isActive && (
                  <div className="w-3 h-3 rounded-full bg-linear-to-br from-green-300 to-yellow-500 shadow-inner" />
                )}
              </div>
              {!isLast && (
                <div className="w-10 h-1.5 bg-gray-600 -mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <h1 className="text-white text-xl font-sans font-bold tracking-wide">
        Question <span className="text-yellow-400">{currentStep + 1}</span> of {totalQuestions}
      </h1>
      
    </div>
  );
};

export default QuizProgress;