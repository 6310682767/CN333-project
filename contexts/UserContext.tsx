import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  studentId: string;
  name: string;
  faculty: string;
  department: string;
  email: string;
  displayName: string;
  avatar?: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser ต้องใช้ภายใน <UserProvider>");
  }
  return context;
};
