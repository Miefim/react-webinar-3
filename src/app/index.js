import {Routes, Route} from "react-router-dom";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile"

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore()
  const activeModal = useSelector(state => state.modals.name);

  useInit(async() => {
    const token = localStorage.getItem('token')
    if(token){
      await store.actions.user.getUserData(token)
      store.actions.user.setToken(token)
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
