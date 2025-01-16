import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setMousePosition({
        mouseX: e.clientX || (e.touches?.[0]?.clientX ?? 0),
        mouseY: e.clientY || (e.touches?.[0]?.clientY ?? 0),
      });
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("touchmove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchmove", updatePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
