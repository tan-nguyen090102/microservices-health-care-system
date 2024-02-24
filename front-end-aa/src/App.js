import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "./Login";
import Forgot from "./forgot"

function App() {
  return (
    <Routes>
      <Route path="/cas-login" element={<LoginPanel></LoginPanel>}></Route>
      <Routes><Route path= "/forgotpw" element={<Forgot></Forgot>}> </Route> </Routes>
    </Routes>
  );
}

export default App;
