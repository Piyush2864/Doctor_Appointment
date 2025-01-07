import { createSlice } from "@reduxjs/toolkit";

const PatientsSlice = createSlice({
  name: "patients",
  initialState: {
    patients: {
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "Male",
      contactNumber: "",
      profilePicture: null,
    },
  },
  reducers: {
    updateField : (state ,action)=>{
        const {field , value} = action.payload
        state[field] = value
    },
    resetFrom : ()=>initialState,
}});

export const { updateField ,  resetFrom} = PatientsSlice.actions;
export default PatientsSlice.reducer;