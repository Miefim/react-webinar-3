import {Routes, Route, Navigate} from "react-router-dom";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile"
import PrivateRoute from "../containers/private-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore()

  useInit(() => store.actions.auth.getAuthData(), [])

  const activeModal = useSelector(state => state.modals.name)

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>  
        <Route path={'/login'} element={
          <PrivateRoute>
            <Auth/>
          </PrivateRoute>
        }/>
        <Route path={'/profile'} element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        }/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
