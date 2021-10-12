import { Counter } from './features/counter/Counter';
import { Dashboard } from './components';

function App() {
  const counter = false;
  return (
    <>
      {counter ? <Counter /> : <Dashboard />}
    </>
  );
}

export default App;
