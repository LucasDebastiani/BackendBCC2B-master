import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://backend-bcc-2-b.vercel.app/usuario');
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const loginUser = createAsyncThunk('user/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://backend-bcc-2-b.vercel.app/usuario/login', credentials);
    return response.data; // Assume que a resposta inclui dados do usuário autenticado
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  users: [],
  currentUser: null,
  status: 'idle', 
  error: null,
};

const usuarioSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.currentUser = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUsers, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;
