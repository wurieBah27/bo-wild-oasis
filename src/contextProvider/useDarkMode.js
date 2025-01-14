import { createContext, useContext } from "react";
// import DarkModeContext from "./DarkModeContext";

const DarkModeContext = createContext();

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error(
      "Dark mode context was used outside of dark mode provider."
    );

  return context;
}

export { DarkModeContext, useDarkMode };
