import {createSlice} from '@reduxjs/toolkit';

const patientsSlice = createSlice({
    name:"patients",
    initialState:{
        patients:[]
    },
    reducers:{
        setPatients(state, action){
            state.patients = action.payload;
        }
    }
})

export const {setPatients} = patientsSlice.actions;