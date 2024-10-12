// slices/employeeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../../apolloClient"; // Apollo Client for querying

// GraphQL Query for getting employee by ID
const GET_EMPLOYEE_BY_ID = gql`
  query EmployeeById($id: String) {
    employeeById(id: $id) {
      id
      userId
      firstName
      lastName
      middleName
      prefferedName
      ssn
      birthday
      gender
      identity
      createdAt
      updatedAt
      onboardingStatus
      email
    }
  }
`;

// Async thunk to fetch employee data by ID
export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (id: string, thunkAPI) => {
    const { data } = await client.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id },
    });
    return data.employeeById;
  }
);

interface EmployeeState {
  employee: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  employee: null,
  status: "idle",
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch employee data";
      });
  },
});

export default employeeSlice.reducer;
