export const initializeGraphData = (callData) => {
  let nodes = [];
  let edges = [];

  callData?.forEach((callStr) => {
    const [caller, callee] = callStr.split(" calls ");
    if (!nodes.includes(caller)) {
      nodes.push(caller);
    }
    if (!nodes.includes(callee)) {
      nodes.push(callee);
    }
  });

  nodes.sort((a, b) => a.localeCompare(b));

  callData?.forEach((callStr) => {
    const [caller, callee] = callStr.split(" calls ");
    edges.push({ from: `node-${caller}`, to: `node-${callee}` });
  });

  return {
    nodes: nodes.map((node) => ({
      id: `node-${node}`,
      label: node,
      title: node,
    })),
    edges,
  };
};

// prints a Topological Sort of the
// complete graph
export const topologicalSort = (callData) => {
  let graphData = initializeGraphData(callData);
  let nodesCount = graphData.nodes.length;

  let adj = new Array(nodesCount)
    .fill(0)
    .map(() => new Array(nodesCount).fill(0));
  let indegree = new Array(nodesCount).fill(0),
    flag = new Array(nodesCount).fill(0);
  let nodeToId = graphData.nodes.reduce((acc, node, index) => {
    acc[node.id] = index;
    return acc;
  }, {});
  let i,
    j,
    k,
    result = [];

  graphData.edges.forEach((edge) => {
    let from = nodeToId[edge.from];
    let to = nodeToId[edge.to];
    adj[from][to]++;
    indegree[to]++;
  });

  for (i = 0; i < nodesCount; i++) {
    for (j = 0; j < nodesCount; j++) {
      if (!flag[j] && !indegree[j]) break;
    }
    if (j === nodesCount) {
      return ["impossible"];
    }
    flag[j] = 1;
    result.push(graphData.nodes[j].title);
    for (k = 0; k < nodesCount; k++) {
      if (adj[j][k]) {
        indegree[k] -= adj[j][k];
        adj[j][k] = 0;
      }
    }
  }
  return result;
};
