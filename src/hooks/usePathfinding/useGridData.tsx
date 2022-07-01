import { useMemo } from "react";
import useGridSize from "../useGridSize";
import { constructNodesArray } from "./helper";

const NODE_SIZE = 20;
const GAP = 2.5;

export const useGridData = () => {
  const { width, height } = useGridSize();

  const rows = useMemo(() => {
    let value = Math.floor(height / (NODE_SIZE + GAP));
    if (value % 2 === 0) value -= 1;
    return value;
  }, [height]);
  const columns = useMemo(() => {
    let value = Math.floor(width / (NODE_SIZE + GAP));
    if (value % 2 === 0) value -= 1;
    return value;
  }, [width]);

  const nodes = useMemo(
    () => constructNodesArray(rows, columns),
    [rows, columns]
  );

  return { initialNodes: nodes, rows, columns };
};
