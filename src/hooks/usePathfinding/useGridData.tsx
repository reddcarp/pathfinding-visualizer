import { useMemo } from "react";
import useWindowSize from "../useWindowSize";
import { constructNodesArray } from "./helper";

const NODE_SIZE = 20;
const GAP = 2.5;

export const useGridData = () => {
  const { width, height } = useWindowSize();

  const rows = useMemo(() => Math.floor(height / (NODE_SIZE + GAP)), [height]);
  const columns = useMemo(() => Math.floor(width / (NODE_SIZE + GAP)), [width]);

  const nodes = useMemo(
    () => constructNodesArray(rows, columns),
    [rows, columns]
  );

  return { initialNodes: nodes, rows, columns };
};
