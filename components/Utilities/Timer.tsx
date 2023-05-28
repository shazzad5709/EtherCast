import { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {seconds <= 0 ? (
        <div className="text-red-500">
        <b>Time's up!</b> Now you can click on the{' '}
        <b className="text-blue-500">resend code</b>
      </div>
      
      ) : (
        <span>Time remaining : {seconds} seconds</span>
      )}
    </div>
  );
};

export default Timer;
