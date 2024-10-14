import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { act } from "react-dom/test-utils";

// GraphQL mutations and queries for sign-up and sign-in
const SIGN_UP_MUTATION = gql`
  mutation Mutation($username: String, $email: String, $password: String) {
    createUser(username: $username, email: $email, password: $password) {
      email
      id
      username
      image
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

// Thunk for signing up a user
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({ email, password, username }: { email: string; password: string; username: string }, thunkAPI) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { email, password, username },
      });
      return data.createUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for signing in a user
export const signInUser = createAsyncThunk(
    "user/signInUser",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
      try {
        const { data } = await client.mutate({
          mutation: SIGN_IN_MUTATION,
          variables: { email, password },
        });
        return data.signIn; // Return the user data from the response
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

interface UserState {
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // state.isAuthenticated = true;
      console.log(action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      // state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign-up cases
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Sign-in cases
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
