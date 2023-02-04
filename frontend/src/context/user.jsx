import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(
    sessionStorage.user !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );

  const handleUser = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser();
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default {
  UserContext,
  UserProvider,
};
