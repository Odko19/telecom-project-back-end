import React, { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = (props) => {
  const [user1, setUser1] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser1(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user1, setUser1 }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
