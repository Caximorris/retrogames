import { useEffect } from 'react';

const useKeyPress = (callback: (key: string) => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      callback(event.key);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callback]);
};

export default useKeyPress;