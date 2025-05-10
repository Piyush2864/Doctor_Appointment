import {createSlice }  from '@reduxjs/toolkit';

const AppointmentSlice = createSlice({

    name : 'appointments',
    initialState : {
         appointments : []
    },
         reducers: {
            setAppoinments(state,action){
                state.appointments = action.payload;
            }
        }
    });
    export const {setAppointments} = AppointmentSlice.actions;
    export default AppointmentSlice.reducer;