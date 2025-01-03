import {createSlice} from '@reduxjs/toolkit';

const PatientsSlice = createSlice({
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

export const {setPatients} = PatientsSlice.actions;
export default PatientsSlice.reducer;