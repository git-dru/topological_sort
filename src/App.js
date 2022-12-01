import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import AddCalls from './components/AddCalls';
function App() {
  const [data, setData] = useState([])
  const [result, setResult] = useState([]);

  const onShowResult = () => {
    setResult([])
    let V;

    // An Array of List which contains
    // references to the Adjacency List of
    // each vertex
    let adj;

    function Graph(v) {
      V = v;
      adj = new Array(V);
      for (let i = 0; i < V; i++)
        adj[i] = [];
    }

    // Function to add an edge to graph
    function addEdge(u, v) {
      adj[u].push(v);
    }

    var rawData = [];
    data.forEach(x => {
      const y = x.split(' calls ');
      if (!rawData.includes(y[0])) {
        rawData.push(y[0])
      }
      if (!rawData.includes(y[1])) {
        rawData.push(y[1])
      }
    })
    const sortedData = rawData.sort((a, b) => a.localeCompare(b));

    // prints a Topological Sort of the
    // complete graph
    function topologicalSort() {

      // Create a array to store
      // indegrees of all
      // vertices. Initialize all
      // indegrees as 0.
      let indegree = new Array(V);
      for (let i = 0; i < V; i++)
        indegree[i] = 0;

      // Traverse adjacency lists
      // to fill indegrees of
      // vertices. This step takes
      // O(V+E) time
      for (let i = 0; i < V; i++) {
        let temp
          = adj[i];
        for (let node = 0; node < temp.length; node++) {
          indegree[temp[node]]++;
        }
      }

      // Create a queue and enqueue
      // all vertices with indegree 0
      let q = [];
      for (let i = 0; i < V; i++) {
        if (indegree[i] === 0)
          q.push(i);
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
        q = q.sort((a, b) => a - b)
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
          if (--indegree[adj[u][node]] === 0)
            q.push(adj[u][node]);
        }
        cnt++;
      }

      // Check if there was a cycle
      if (cnt !== V) {
        setResult([...result, "There exists a cycle in the graph"]);
        return;
      }

      // Print topological order
      let rlt = []
      for (let i = 0; i < topOrder.length; i++) {
        rlt.push(sortedData[topOrder[i]]);
      }
      setResult([...result, ...rlt])
    }

    // Driver program to test above functions
    // Create a graph given in the above diagram
    Graph(sortedData.length);
    data.forEach(x => {
      const y = x.split(' calls ');
      console.log(sortedData.indexOf(y[0]), sortedData.indexOf(y[1]))
      addEdge(sortedData.indexOf(y[0]), sortedData.indexOf(y[1]));
    })

    topologicalSort();
  }

  return (
    <div className="container">
      <div className='input-group'>
        <AddCalls data={data} setData={setData} />
      </div>
      <div className='graph-group'>
        <div className='graph-data'>
          <h3>DATA</h3>
          <textarea value={data.join('\n')} rows={8} />
          <button className='draw-btn' onClick={onShowResult}>Show Result</button>
        </div>
        <Home data={data} />
        <div className='graph-data'>
          <h3>Result</h3>
          <textarea value={result.join('\n')} rows={8} />
        </div>
      </div>
    </div>
  );
}

export default App;
