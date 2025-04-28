import React, { createContext, useState, useContext } from 'react';

type ForumContextType = {
  campus: string;
  setCampus: (campus: string) => void;
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>; 
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campus, setCampus] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  return (
    <ForumContext.Provider value={{ campus, category, setCampus, setCategory }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = (): ForumContextType => {
  const context = useContext(ForumContext);
  if (!context) throw new Error('useForum must be used within a ForumProvider');
  return context;
};
