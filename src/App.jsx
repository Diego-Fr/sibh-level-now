
import './App.css';
import MapComponent from './components/map/map';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './components/modal/modal';
import ModalStation from './pages/modal_station/modalStation';


function App() {
  const dispatch = useDispatch(store=>store.stationReducer)
  useEffect(()=>{
    let i = -23.550520, y = -46.633308, f = 1
    let interval = setInterval(_=>{
      dispatch({type: 'ADD_STATION', value: {lat:i, lng:y, id:f, visible: true}})
      i += 0.10
      f += 1
      if(f > 10){
        clearInterval(interval)
      }
    },300)
  })

  return (
    <div className='app-container'>
      <MapComponent></MapComponent>
      <Modal
        body={<ModalStation></ModalStation>}
      >
      </Modal>
    </div>
  );
}

export default App;
