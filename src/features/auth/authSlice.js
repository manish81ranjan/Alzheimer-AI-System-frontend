// src/features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { tokenStorage } from "../../api/tokenStorage";

/**
 * Async actions
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.register(payload);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.login(payload);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Login failed");
    }
  }
);

export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const user = await authService.me();
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to fetch profile");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logout();
  return true;
});

/**
 * Initial state (persisted session)
 */
const initialState = {
  user: tokenStorage.getUser(),
  token: tokenStorage.getToken(),
  isAuthenticated: tokenStorage.isAuthenticated(),

  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = tokenStorage.getToken();
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = tokenStorage.getToken();
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Me
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = Boolean(tokenStorage.getToken());
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";

        // if token invalid, session likely cleared by interceptor
        state.user = tokenStorage.getUser();
        state.token = tokenStorage.getToken();
        state.isAuthenticated = tokenStorage.isAuthenticated();
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = "";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
