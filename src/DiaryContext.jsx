import { createContext, useState } from "react";

export const DiaryContext = createContext();

// eslint-disable-next-line react/prop-types
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
