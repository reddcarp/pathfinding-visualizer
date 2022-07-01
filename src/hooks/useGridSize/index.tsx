import { useEffect, useState } from "react";

const MAX_HEIGHT = 1500;
const MAX_WIDTH = 2000;

interface windowSizeType {
  width: number | undefined;
  height: number | undefined;
}

export default function useGridSize() {
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

  const [gridSize, setGridSize] = useState<windowSizeType>({
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
        setGridSize({
          width: document.getElementById("grid-container")?.offsetWidth,
          height: getGridHeight(),
        });
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    setGridSize({
      width: document.getElementById("grid-container")?.offsetWidth,
      height: getGridHeight(),
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: Math.min(gridSize.width ? gridSize.width : 50, MAX_WIDTH),
    height: Math.min(gridSize.height ? gridSize.height : 25, MAX_HEIGHT),
  };
}
