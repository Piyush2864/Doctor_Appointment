import { configureStore } from "@reduxjs/toolkit";
import DoctorsSlice from "./CreateSlice/DoctorsSlice";
import PatientsSlice from "./CreateSlice/Patientslice";
import AppointmentSlice from "./CreateSlice/AppointmentSlice";
import AdminSlice from "./CreateSlice/AdminSlice";

const store = configureStore({
    reducer: {
        doctors: DoctorsSlice,
        patients: PatientsSlice,
        appointments: AppointmentSlice,
        admin : AdminSlice,
    },
})

export default store;