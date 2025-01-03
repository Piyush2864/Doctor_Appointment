import {createSlice } from '@reduxjs/toolkit';

const AdminSlice = createSlice({
    name : 'admin',
    initialState :{
     isLoggedIn: false,
        userDetails: {},
    },
     reducers : {
       adminLogin(state,action){
              state.isLoggedIn = true;
              state.userDetails = action.payload;
       },
       adminLogout(state){
         state.isLoggedIn = false;
         state.userDetails = {};
       },
     },
});

export const {adminLogin,adminLogout} = AdminSlice.actions;
export default AdminSlice.reducer;