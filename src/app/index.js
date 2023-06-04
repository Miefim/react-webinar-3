import {Routes, Route} from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile"
import UserDataInit from "../containers/user-data-init";
import PrivateRoute from "../components/private-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    loggedIn: state.auth.loggedIn
  }))

  return (
    <UserDataInit>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>  
        <Route element={<PrivateRoute condition={!select.loggedIn} redirect='/profile'/>}>
          <Route path={'/login'} element={<Auth/>}/>
        </Route>
        <Route element={<PrivateRoute condition={select.loggedIn} redirect='/login'/>}>
          <Route path={'/profile'} element={<Profile/>}/>
        </Route>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </UserDataInit>
  );
}

export default App;
