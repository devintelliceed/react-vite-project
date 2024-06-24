
//outsource dependencies
import { configureStore } from '@reduxjs/toolkit';

//local dependencies
import mainReducer from './main-slice.js';
import todoListReducer from './todo-list-slice.js';

const store = configureStore({
    reducer: {
        main: mainReducer,
        toDoList: todoListReducer,
    }
});

export default store
