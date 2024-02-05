import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/system-login" element={<LoginPanel></LoginPanel>}></Route>
    </Routes>
  );
}

export default App;
