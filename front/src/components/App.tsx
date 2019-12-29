import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { countUpRest, countUpSocket } from "../stores/counter";
import { sleepRest, sleepSocket } from "../stores/sleeper";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector((store: any) => store.counter);
  const sleeper = useSelector((store: any) => store.sleeper);

  return (
    <div className="App">
      <p>{counter.count}</p>
      <p>{counter.message}</p>
      <button onClick={() => dispatch(countUpRest())}>countUpRest</button>
      <button onClick={() => dispatch(countUpSocket())}>countUpSocket</button>
      <p>{sleeper.sleep}</p>
      <p>{sleeper.message}</p>
      <button onClick={() => dispatch(sleepRest())}>sleepRest</button>
      <button onClick={() => dispatch(sleepSocket())}>sleepSocket</button>
    </div>
  );
}

export default App;
