import { createSlice } from '@reduxjs/toolkit';

const initState = {
  id: '',
  email: '',
  fullName: '',
  role: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;