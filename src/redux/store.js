import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./reducers/pizzaSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
});
