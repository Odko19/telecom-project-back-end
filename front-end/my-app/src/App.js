import "./App.css";
import Main from "./componants/Main";
import Login from "./componants/Login";
import { useEffect, useState } from "react";
import Admin from "./componants/Admin/Admin";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return (
    <div>{user ? user?.data.id === 7 ? <Admin /> : <Main /> : <Login />}</div>
  );
}

export default App;
