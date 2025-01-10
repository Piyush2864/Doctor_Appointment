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
