import "react-router-dom";
import { Route, Routes} from "react-router-dom";
import HomePanel from "./HomePatient";
import Visits from "./Visits";
import Messages from "./Messages";
import TestResults from "./TestResults";
import Medications from "./Medications";
import PatientDashboard from "./PatientDashboard";

function App() {
  return (
    <div>
      <PatientDashboard />
        <Routes>
          <Route path="/patient-home" element={<HomePanel></HomePanel>}></Route>
          <Route path="/visits" element={<Visits></Visits>}></Route>
          <Route path="/messages" element={<Messages></Messages>}></Route>
          <Route path="/test-results" element={<TestResults></TestResults>}></Route>
          <Route path="/medications" element={<Medications></Medications>}></Route>
        </Routes>
    </div>  
  );
}
export default App;
