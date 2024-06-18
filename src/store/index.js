
//outsource dependencies
import { configureStore } from "@reduxjs/toolkit";

//local dependencies
import mainSlice from "./main-slice.js";
import todoListSlice from "./todo-list-slice.js";





const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        toDoList: todoListSlice.reducer,
    }
});

export const mainSliceActions = mainSlice.actions;
export const toDoSliceActions = todoListSlice.actions;
export default store
