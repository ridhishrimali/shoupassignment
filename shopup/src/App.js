import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import AddMeeting from "./AddMeeting";
import RoomSelect from "./RoomSelect";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/addmeeting" component={AddMeeting} exact />
      <Route path="/roomselect" component={RoomSelect} exact />
    </Router>
  );
}

export default App;
