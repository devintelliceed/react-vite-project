import {SOURCE_TYPE} from "../constants/types-const.js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: false,
    source: SOURCE_TYPE.HOME_PAGE,
};
const reducers = {
    toggleMenu: (state) => {
        state.isMenuOpen = !state.isMenuOpen;
    },
    setSource: (state, action) => {
        state.source = action.payload;
        state.isMenuOpen = false;
    }
};
const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers,
});

export default mainSlice;
