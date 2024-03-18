import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzaData: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzaData: (state, action) => {
      return {
        ...state,
        pizzaData: action.payload,
      };
    },
    addPizzaData: (state, action) => {
      return {
        ...state,
        pizzaData: [...state.pizzaData, action.payload],
      };
    },
    cancelPizzaData: (state, action) => {
      const updatedOrder = state?.pizzaData?.map((d) => {
        if (d?.id === action.payload) {
          return { ...d, active: false };
        }
        return d;
      });
      return {
        ...state,
        pizzaData: updatedOrder,
      };
    },
  },
});

export const { setPizzaData, addPizzaData, cancelPizzaData } =
  pizzaSlice.actions;
export default pizzaSlice.reducer;
