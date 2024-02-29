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
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path={LOGIN_PATH} element={<LoginPanel></LoginPanel>}></Route>
      {/* <Route path="/" element={<LoginPanel></LoginPanel>}></Route> */}
      <Route path= {FORGOT_PASSWORD_PATH} element={<Forgot></Forgot>}> </Route> 
      <Route path= {CHANGE_PASSWORD_PATH} element={<ChangePw></ChangePw>}> </Route> 
=======
      <Route path = '/' element={<SignUpPanel></SignUpPanel>}></Route>
=======
      <Route path = '/cas-signup' element={<SignUpPanel></SignUpPanel>}></Route>
>>>>>>> edits
      <Route path="/cas-login" element={<LoginPanel></LoginPanel>}></Route>
>>>>>>> front end for signup
    </Routes>
  );
}

export default App;
