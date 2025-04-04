import { createContext, useReducer } from "react";

const InitialState = {
  country: undefined,
  dates: [],
};

export const SearchContext = createContext(InitialState);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return InitialState;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, InitialState);

  return (
    <SearchContext.Provider value={{ country: state.country, dates: state.dates, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
