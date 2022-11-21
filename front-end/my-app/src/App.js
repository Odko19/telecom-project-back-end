import logo from "./logo.svg";
import "./App.css";
import Main from "./componants/Main";
import Login from "./componants/Login";
import { useEffect, useState } from "react";
import { useUser } from "./contexts/userCtx";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return <div>{user ? <Main /> : <Login />}</div>;
}

export default App;
