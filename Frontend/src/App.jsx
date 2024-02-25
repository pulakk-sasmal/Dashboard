import {useState,  useRef} from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import Visual from './components/Visual';


function App() {
  const [eff, setEff] = useState({
    end_year : '',
    topic : '' ,
    sector : '' ,
    region : '' ,
    country : '' ,
    city : '', 
  });

  const workEff = (data) => {
    setEff(data);
  }

  const scrollToVisual = () => {
    const visualElement = document.getElementById('visual');
    if (visualElement) {
      window.scrollTo({
        top: visualElement.offsetTop,
        behavior: 'instant'
      });
    }
  };

  return (
    <>
      <div className='position'>
        <Header />
        <Filter scrollToVisual={scrollToVisual} workEff={workEff} />
        <Visual eff={eff} />
      </div>
    </>
  );
}

export default App;
