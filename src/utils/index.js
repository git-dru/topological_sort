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

  // Driver program to test above functions
  // Create a graph given in the above diagram
  let adj = new Array(nodesCount);
  // Create a array to store indegrees of all vertices. Initialize all indegrees as 0
  let indegree = new Array(nodesCount);
  for (let i = 0; i < nodesCount; i++) {
    adj[i] = [];
    indegree[i] = 0;
  }

  // Traverse adjacency lists
  // to fill indegrees of
  // vertices. This step takes
  // O(V+E) time
  for (let i = 0; i < nodesCount; i++) {
    let temp = adj[i];
    for (let node = 0; node < temp.length; node++) {
      indegree[temp[node]]++;
    }
  }

  // Create a queue and enqueue
  // all vertices with indegree 0
  let q = [];
  for (let i = 0; i < nodesCount; i++) {
    if (indegree[i] === 0) q.push(i);
  }

  // Initialize count of visited vertices
  let cnt = 0;

  // Create a vector to store result
  // (A topological ordering of the vertices)
  let topOrder = [];
  while (q.length !== 0) {
    // Extract front of queue
    // (or perform dequeue)
    // and add it to topological order
    q = q.sort((a, b) => a - b);
    let u = q.shift();
    topOrder.push(u);
    // console.log(u)
    // console.log(adj[u])
    // Iterate through all its
    // neighbouring nodes
    // of dequeued node u and
    // decrease their in-degree
    // by 1
    for (let node = 0; node < adj[u].length; node++) {
      // If in-degree becomes zero,
      // add it to queue
      if (--indegree[adj[u][node]] === 0) q.push(adj[u][node]);
    }
    cnt++;
  }

  console.log(cnt, nodesCount);

  // Check if there was a cycle
  if (cnt !== nodesCount) {
    return ["There exists a cycle in the graph"];
  }

  // Print topological order
  let result = [];
  for (let i = 0; i < topOrder.length; i++) {
    result.push(graphData.nodes[topOrder[i]]?.title);
  }
  return result;
};
