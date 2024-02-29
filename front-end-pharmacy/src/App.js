import "react-router-dom";
import { Route, Routes} from "react-router-dom";
import HomePanel from "./HomePharm";
import PharmDashboard from "./PharmDashboard";
import Messages from "./Messages";

function App() {
  return (
    <div>
      <PharmDashboard />
        <Routes>
          <Route path="/pharm-home" element={<HomePanel></HomePanel>}></Route>
          <Route path="/messages" element={<Messages></Messages>}></Route>
        </Routes>
    </div>  
  );
}
export default App;
