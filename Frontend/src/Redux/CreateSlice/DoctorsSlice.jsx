import {createSlice} from '@reduxjs/toolkit';
import { doctors } from '../../assets/SpecialityData';


const DoctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        doctors: doctors,
        loading: false,
        doctorData: null,
        error: null,
    },
    reducers: {
        setDoctors(state, action){
            state.doctors = action.payload;
        },
        doctorsRequest(state){
            state.loading = true;
        },
    
        doctorsLoading(state){
            state.loading = false;
            state.doctorData = action.payload;
        },

        doctorsSuccess(state, action){
            state.loading = false;
            state.doctorData = action.payload;
        }
    }
})

export const {setDoctors ,doctorsRequest , doctorsLoading , doctorsSuccess } = DoctorsSlice.actions;
export default DoctorsSlice.reducer;    