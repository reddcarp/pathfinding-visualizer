import { useEffect, useState } from "react";

const MAX_HEIGHT = 1500;
const MAX_WIDTH = 2000;

interface windowSizeType {
  width: number | undefined;
  height: number | undefined;
}

export default function useWindowSize() {
  const getGridHeight = () => {
    const windowHeight = window.innerHeight;
    let headerHeight = document.getElementById("header")?.offsetHeight;
    headerHeight ??= 0;
    let stateSelectorHeight = document.getElementById(
      "state-selector-container"
    )?.offsetHeight;
    stateSelectorHeight ??= 0;

    return windowHeight - headerHeight - stateSelectorHeight;
  };

  const [windowSize, setWindowSize] = useState<windowSizeType>({
    width: document.getElementById("grid-container")?.offsetWidth,
    height: getGridHeight(),
  });

  useEffect(() => {
    let _timeout: any;

    const handleResize = () => {
      if (_timeout) {
        clearTimeout(_timeout);
      }

      _timeout = setTimeout(() => {
        setWindowSize({
          width: document.getElementById("grid-container")?.offsetWidth,
          height: getGridHeight(),
        });
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    setWindowSize({
      width: document.getElementById("grid-container")?.offsetWidth,
      height: getGridHeight(),
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: Math.min(windowSize.width ? windowSize.width : 50, MAX_WIDTH),
    height: Math.min(windowSize.height ? windowSize.height : 25, MAX_HEIGHT),
  };
}
