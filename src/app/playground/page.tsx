'use client'

export default function Playground() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {/* iPhone Container */}
      <div className="relative">
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
            {/* <span className="text-3xl font-semibold text-gray-900 text-center mt-12">
              Log in
            </span> */}
            <span className="absolute top-[40px] left-[165px] text-3xl font-bold text-gray-800">
              Sign in
            </span>
            <div className="absolute top-[120px] left-[20px] w-[353px] h-[50px] bg-white border border-gray-300 rounded">
              <span className="">Email</span>
            </div>
            <div className="absolute top-[190px] left-[40px] w-[350px] h-[50px] bg-white border border-gray-300 rounded"/>
            <div className="absolute top-[270px] left-[40px] w-[350px] h-[50px] bg-blue-500 rounded flex items-center justify-center"/>
            <span className="absolute top-[340px] left-[160px] text-sm text-blue-500">
              Forgot password?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 