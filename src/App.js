import { useState } from 'react'
import Exercises from './components/Exercises/Exercises';
import Header from './components/Layout/Header';
import Training from './components/Training/Training';
import TrainingProvider from './store/TrainingProvider';

function App() {

  const [isShown, setIsShown] = useState(false);

  const showTrainingHandler = () =>{
    setIsShown(true);
  }

  const closeTrainingHandler = () => {
    setIsShown(false);
  }

  return (
    <TrainingProvider>
      {isShown && <Training onClose={closeTrainingHandler}/>}
      <Header onShowTraining={showTrainingHandler}/>
      <main>
        <Exercises />
      </main>
    </TrainingProvider>
  );
}

export default App;
