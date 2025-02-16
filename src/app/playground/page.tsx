'use client'
import { useState } from 'react';
import { useDrag } from '../../hooks/useDrag';
import { Element } from '../../types/elements';

export default function Playground() {
  const [elements, setElements] = useState<Element[]>([{
    id: 'iphone-screen',
    type: 'iphone14pro',
    x: 0,
    y: 0,
    style: {
      zIndex: 0
    }
  }]);
  const { dragState, handleMouseDown, handleMouseMove, handleMouseUp } = useDrag(1, setElements);

  const handleMouseMoveWrapper = (e: React.MouseEvent) => {
    if (dragState.isDragging) {
      handleMouseMove(e as unknown as MouseEvent);
    }
  };

  return (
    <div 
      className="w-full h-screen flex items-center justify-center bg-gray-100"
      onMouseMove={handleMouseMoveWrapper}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* iPhone Container */}
      <div 
        className="relative cursor-move"
        style={{
          transform: `translate(${elements[0].x}px, ${elements[0].y}px)`,
        }}
        onMouseDown={(e) => handleMouseDown(e as unknown as MouseEvent, elements[0])}
      >
        {/* iPhone Frame */}
        <div className="w-[393px] h-[852px] rounded-[55px] border-[12px] border-gray-900 relative bg-white overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[24px] z-10" />
          
          {/* Frame Buttons */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Volume Buttons */}
            <div className="absolute -left-[12px] top-[200px] w-[12px] h-[50px] bg-gray-900" /> {/* Volume Up */}
            <div className="absolute -left-[12px] top-[270px] w-[12px] h-[50px] bg-gray-900" /> {/* Volume Down */}
            {/* Power Button */}
            <div className="absolute -right-[12px] top-[180px] w-[12px] h-[100px] bg-gray-900" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full p-8">
            <span className="absolute top-[40px] left-[50%] -translate-x-1/2 text-2xl font-bold text-center text-gray-400">Log in</span>
            <div className="absolute top-[100px] left-[50%] -translate-x-1/2 w-[100px] h-[100px] bg-gray-200 rounded-full"/>
            <div className="absolute top-[240px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2">
              <span className="text-gray-400 text-sm">Email</span>
            </div>
           
            <div className="absolute top-[310px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2">
              <span className="text-gray-400 text-sm">Password</span>
            </div>

            <div className="absolute top-[380px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-blue-500 rounded text-white text-center flex items-center justify-center cursor-pointer">
              <span className="font-semibold">Sign in</span>  
            </div>

            <span className="absolute top-[450px] left-[50%] -translate-x-1/2 text-sm text-blue-500 cursor-pointer">
              Forgot password?
            </span>

            <div id="social-signin-section" className="absolute top-[520px] left-[50%] -translate-x-1/2 w-[300px] h-[100px] flex justify-between items-center">
              <div className="w-[90px] h-[40px] bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">Facebook</span>
              </div>

              <div className="w-[90px] h-[40px] bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">Google</span>
              </div>

              <div className="w-[90px] h-[40px] bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">Apple</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 