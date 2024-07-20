// //Frontend\src\AuthContext.js

// import { createContext } from "react";

// let AuthContext = createContext(null);

// export default AuthContext;


import { createContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  // Example user data for now, replace with actual user data later
  const [user, setUser] = useState({ _id: "user-id-example", name: "User" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
