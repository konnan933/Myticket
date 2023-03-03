import { createSlice } from '@reduxjs/toolkit';

const PICTURE_INIT_STATE = {};
const pictureSlice = createSlice({
  name: 'picture',
  initialState: PICTURE_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {}
});
export default pictureSlice.reducer;
