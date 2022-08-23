import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todoSlice";
export const store = configureStore({
    reducer: {
    todos: todosSlice,
    
    },
})