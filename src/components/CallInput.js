import React, { useState } from "react";

const CallInput = ({ data, setData }) => {
  const [caller, setCaller] = useState("");
  const [callee, setCallee] = useState("");

  const handleClick = () => {
    if (!caller || !callee || !setData) {
      return;
    }

    setData([...data, `${caller} calls ${callee}`]);
    setCallee("");
    setCaller("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter caller here."
        value={caller}
        onChange={(e) => setCaller(e.target.value)}
      />
      <span>calls</span>
      <input
        type="text"
        placeholder="Enter callee here."
        value={callee}
        onChange={(e) => setCallee(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default CallInput;
