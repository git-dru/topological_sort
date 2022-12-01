import { useState } from "react";
import { CallInput, CallGraph } from "./components";
import { topologicalSort } from "./utils";

import "./App.css";

function App() {
  const [callData, setCallData] = useState([]);
  const [result, setResult] = useState([]);

  const onShowResult = () => {
    setResult(topologicalSort(callData));
  };

  return (
    <div className="container">
      <div className="input-group">
        <CallInput data={callData} setData={setCallData} />
      </div>
      <div className="graph-group">
        <div className="graph-data">
          <h3>DATA</h3>
          <textarea value={callData.join("\n")} rows={8} />
          <button className="draw-btn" onClick={onShowResult}>
            Show Result
          </button>
        </div>
        <CallGraph callData={callData} />
        <div className="graph-data">
          <h3>Result</h3>
          <textarea value={result.join("\n")} rows={8} />
        </div>
      </div>
    </div>
  );
}

export default App;
