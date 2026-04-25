import React from 'react';

const PenguinLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {/* Penguin Body (Black) */}
      <div className="absolute w-[90%] h-[90%] bg-penguin-black rounded-[40%_40%_45%_45%] shadow-sm overflow-hidden">
        {/* White Belly */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[75%] h-[70%] bg-white rounded-[50%_50%_45%_45%]" />
        
        {/* Eyes Container */}
        <div className="absolute top-[20%] left-0 w-full flex justify-center gap-[15%]">
          <div className="w-[15%] h-[15%] bg-white rounded-full flex items-center justify-center">
             <div className="w-[60%] h-[60%] bg-penguin-black rounded-full" />
          </div>
          <div className="w-[15%] h-[15%] bg-white rounded-full flex items-center justify-center">
             <div className="w-[60%] h-[60%] bg-penguin-black rounded-full" />
          </div>
        </div>

        {/* Beak (Yellow) */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-penguin-yellow" />
      </div>
      
      {/* Flippers */}
      <div className="absolute left-[-5%] top-[45%] w-[20%] h-[35%] bg-penguin-black rounded-[100%_0%_0%_100%] rotate-[-15deg]" />
      <div className="absolute right-[-5%] top-[45%] w-[20%] h-[35%] bg-penguin-black rounded-[0%_100%_100%_0%] rotate-[15deg]" />
    </div>
  );
};

export default PenguinLogo;
