import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  age: "",
  gender: "Male",
  contactNumber: "",
  profilePicture: null,
};

<<<<<<< HEAD:Frontend/src/Redux/CreateSlice/Patientslice.jsx
const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,  
  },
});

export const { updateField, resetForm } = PatientSlice.actions;
export default PatientSlice.reducer;
=======
export const { updateField ,  resetFrom} = PatientsSlice.actions;
export default PatientsSlice.reducer;
>>>>>>> 470953685ca541b2bc11bb467c1dd969edd69726:Frontend/src/Redux/CreateSlice/PatientSlice.jsx
