import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SchedulePanel from "./SchedulePanel";

function App() {
  return (
    <Routes>
      <Route
        path="/scheduler"
        element={<SchedulePanel></SchedulePanel>}
      ></Route>
    </Routes>
  );
}

export default App;
