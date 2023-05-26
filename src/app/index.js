import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket"
import Details from './details';
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  
  const activeModal = useSelector(state => state.modals.name);
  
  return (
    <BrowserRouter>
      {activeModal === 'basket' && <Basket/>}
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/:id" element={<Details/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
