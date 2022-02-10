import { useState } from "react";

const useDebounce = () => {
  const [typingTimeout, setTypingTimeout] = useState("");

  const debounce = (callback, wait) => {
    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => callback(), wait);
    setTypingTimeout(timeout);
  };

  return debounce;
};

export default useDebounce;
