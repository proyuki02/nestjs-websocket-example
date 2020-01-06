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
      <div>
        <button onClick={() => dispatch(sleepRest(2000))}>sleepRest2sec</button>
        <button onClick={() => dispatch(sleepSocket(2000))}>sleepSocket2sec</button>
      </div>
      <div>
        <button onClick={() => dispatch(sleepRest(4000))}>sleepRest4sec</button>
        <button onClick={() => dispatch(sleepSocket(4000))}>sleepSocket4sec</button>
      </div>
      <div>
        <button onClick={() => dispatch(sleepRest(6000))}>sleepRest6sec</button>
        <button onClick={() => dispatch(sleepSocket(6000))}>sleepSocket6sec</button>
      </div>
    </div>
  );
}

export default App;
