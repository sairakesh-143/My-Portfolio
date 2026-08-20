// src/contexts/AIDrawerContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AIDrawerContextProps {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const AIDrawerContext = createContext<AIDrawerContextProps | undefined>(undefined);

export const AIDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <AIDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </AIDrawerContext.Provider>
  );
};

export const useAIDrawer = () => {
  const ctx = useContext(AIDrawerContext);
  if (!ctx) {
    throw new Error("useAIDrawer must be used within AIDrawerProvider");
  }
  return ctx;
};
