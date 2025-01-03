import {createSlice }  from '@reduxjs/toolkit';

const AppoinmentSlice = createSlice({

    name : 'appoinments',
    initialState : {
         appoinments : []
    },
         reducers: {
            setAppoinments(state,action){
                state.appoinments = action.payload;
            }
        }
    });
    export const {setAppoinments} = AppoinmentSlice.actions;