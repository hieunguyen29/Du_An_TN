import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: {},
  userid: {},
  setUser: () => {},
  setUserId: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userid, setUserId] = useState(null);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        userid,
        setUserId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);