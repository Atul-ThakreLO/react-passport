import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { RoutesPaths } from "./Routes/Routes";
import Home from "./Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router >
      <RoutesPaths />
    </Router>
    </>
  );
}

export default App;
