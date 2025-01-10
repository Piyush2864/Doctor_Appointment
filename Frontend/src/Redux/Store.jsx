import { configureStore } from "@reduxjs/toolkit";
import DoctorsSlice from "./CreateSlice/DoctorsSlice";
import PatientSlice from "./CreateSlice/Patientslice";
import AppointmentSlice from "./CreateSlice/AppointmentSlice";
import AdminSlice from "./CreateSlice/AdminSlice";

const store = configureStore({
    reducer: {
        doctors: DoctorsSlice,
        patient: PatientSlice,
        appointments: AppointmentSlice,
        admin : AdminSlice,
    },
})

export default store;