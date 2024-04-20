import "react-router-dom";
import {Route, Routes} from "react-router-dom";
import SignUpPanel from "./SignUp";
import LoginPanel from "./Login";
import Forgot from "./forgot"
import ChangePw from "./changepw"
import {LOGIN_PATH, FORGOT_PASSWORD_PATH, CHANGE_PASSWORD_PATH} from "./links"

function App() {
  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<LoginPanel></LoginPanel>}></Route>
      {/* <Route path="/" element={<LoginPanel></LoginPanel>}></Route> */}
      <Route path= {FORGOT_PASSWORD_PATH} element={<Forgot></Forgot>}> </Route> 
      <Route path= {CHANGE_PASSWORD_PATH} element={<ChangePw></ChangePw>}> </Route> 
    </Routes>
  );
}

export default App;
