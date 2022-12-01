import React, { useEffect, useState } from 'react'

import Graph from "react-graph-vis";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

const Home = ({ data }) => {

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  useEffect(() => {
    let rawData = [];
    data.forEach(x => {
      const y = x.split(' calls ');
      if (!rawData.includes(y[0])) {
        rawData.push(y[0])
      }
      if (!rawData.includes(y[1])) {
        rawData.push(y[1])
      }
    })
    const newnodes = rawData.map((item, index) => ({ id: index + 1, label: item, title: item }))
  
    const newedges = data.map((item, index) => {
      const y = item.split(' calls ')
      return { from: rawData.indexOf(y[0]) + 1, to: rawData.indexOf(y[1]) + 1 }
    })
    setNodes(newnodes);
    setEdges(newedges);
  }, [data])

  return (
    <Graph graph={{nodes, edges}} options={options} style={{ height: "calc(100vh - 182px)" }} />
  );
}

export default Home