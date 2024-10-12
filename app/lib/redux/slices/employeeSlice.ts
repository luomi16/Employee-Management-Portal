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
      address {
        id
        building
        streetName
        city
        state
        zip
      }
      phone {
        id
        cellPhone
        workPhone
      }
      reference {
        id
        firstName
        lastName
        middleName
        phone
        email
        relationship
      }
      workAuthorization {
        id
        visaType
        startDate
        endDate
        documents {
          id
          fileName
          fileUrl
        }
      }
      documents {
        id
        fileName
        fileUrl
      }
      emergencyContacts {
        id
        firstName
        lastName
        middleName
        phone
        email
        relationship
      }
    }
  }
`;

// Async thunk to fetch employee data by ID
export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await client.query({
        query: GET_EMPLOYEE_BY_ID,
        variables: { id },
      });
      console.log(data);
      return data.employeeById;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
