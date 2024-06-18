
//NOTE ToDoSlice
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedProject: undefined,
    pojects: [],
};
const reducers = {
    selectProject: (state, action) => {
        state.selectedProject = action.payload;
    },
};
const toDoListSlice = createSlice({
    name: 'toDoListSlice',
    initialState,
    reducers,
});

export default toDoListSlice;
