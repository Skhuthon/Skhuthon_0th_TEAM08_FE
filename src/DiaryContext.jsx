import React, { createContext, useState } from "react";

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (newEntry) => {
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};
