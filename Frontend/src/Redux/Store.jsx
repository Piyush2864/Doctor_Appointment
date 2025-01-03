import { configureStore } from "@reduxjs/toolkit";
import { setDoctors } from "./CreateSlice/DoctorsSlice";
import { setPatients } from "./CreateSlice/Patientslice";
import { setAppoinments } from "./CreateSlice/AppoinmentSlice";
import { adminLogin ,adminLogout } from "./CreateSlice/AdminSlice";

const store = configureStore({
    reducer: {
        doctors: setDoctors,
        patients: setPatients,
        appoinments: setAppoinments,
        admin: adminLogin, 
        admin: adminLogout,
    },
})