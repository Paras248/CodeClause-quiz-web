import React, { createContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    return (
        <authContext.Provider
            value={{
                userDetails,
                setUserDetails,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
