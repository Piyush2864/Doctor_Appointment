import { configureStore } from "@reduxjs/toolkit";
import DoctorsSlice from "./CreateSlice/DoctorsSlice";
<<<<<<< HEAD
import PatientSlice from "./CreateSlice/Patientslice";
=======
import PatientsSlice from "./CreateSlice/PatientSlice";
>>>>>>> 470953685ca541b2bc11bb467c1dd969edd69726
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