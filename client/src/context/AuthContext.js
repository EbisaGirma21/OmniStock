import { createContext, useState } from "react";
import { sampleUser } from "../data/sampleData";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Mock login — accepts any credentials, sets a sample admin user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulate a short network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !password) {
      setIsLoading(false);
      setError("Please enter your email and password.");
      return false;
    }

    // Accept any non-empty credentials and log in as the sample super-admin
    const mockUser = { ...sampleUser };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const valueToShare = {
    user,
    login,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
