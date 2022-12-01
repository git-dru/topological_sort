import React, { useMemo } from "react";

import Graph from "react-graph-vis";
import { initializeGraphData } from "../utils";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

const CallGraph = ({ callData }) => {
  const graphData = useMemo(() => initializeGraphData(callData), [callData]);

  return (
    <Graph
      graph={graphData}
      options={options}
      style={{ height: "calc(100vh - 182px)" }}
    />
  );
};

export default CallGraph;
