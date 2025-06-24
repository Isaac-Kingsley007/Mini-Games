import { useState } from 'react';

export default function SignupButton({ onClick }:{onClick: () => Promise<boolean>}) {
  const [timer, setTimer] = useState(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const handleClick = async () => {
    setIsBlocked(true);
    if (timer === 0) {
      const result = await onClick();
      if(!result) {
        setIsBlocked(false);
        return;
      }
      let innerTimer = 60;
      const intervelId = setInterval(() => {
        setTimer(innerTimer);
        if(innerTimer === 0){
            clearInterval(intervelId);
            setIsBlocked(false);
        }
        innerTimer--;
      }, 1000);
    }
  };

  return (
    <button
      className={`w-full py-3 rounded-xl font-semibold transition ${
        timer === 0
          ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
          : 'bg-gray-400 text-white cursor-not-allowed'
      }`}
      onClick={handleClick}
      disabled={isBlocked}
    >
      {timer > 0 ? `Resend in ${timer}s` : 'Submit'}
    </button>
  );
}
