import {createSlice} from '@reduxjs/toolkit';
import { doctors } from '../../assets/SpecialityData';

const DoctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        doctors: doctors,
    },
    reducers: {
        setDoctors(state, action){
            state.doctors = action.payload;
        }
    }
})

export const {setDoctors} = DoctorsSlice.actions;
export default DoctorsSlice.reducer;    