import { useEffect, useState } from "react";

const MAX_HEIGHT = 1500;
const MAX_WIDTH = 2000;

interface windowSizeType {
  width: number;
  height: number;
}

export default function useGridSize() {
  const getGridHeight = () => {
    let trueWindowHeight = document.getElementById("root")?.offsetHeight;
    trueWindowHeight ??= 0;
    let headerHeight = document.getElementById("header")?.offsetHeight;
    headerHeight ??= 0;
    let stateSelectorHeight = document.getElementById(
      "state-selector-container"
    )?.offsetHeight;
    stateSelectorHeight ??= 0;

    return trueWindowHeight - headerHeight - stateSelectorHeight;
  };

  const [gridSize, setGridSize] = useState<windowSizeType>({
    width: window.innerWidth,
    height: getGridHeight(),
  });

  useEffect(() => {
    let _timeout: any;

    const handleResize = () => {
      if (_timeout) {
        clearTimeout(_timeout);
      }

      _timeout = setTimeout(() => {
        setGridSize({
          width: window.innerWidth,
          height: getGridHeight(),
        });
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    setGridSize({
      width: window.innerWidth,
      height: getGridHeight(),
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: Math.min(gridSize.width, MAX_WIDTH),
    height: Math.min(gridSize.height, MAX_HEIGHT),
  };
}
