import { createSlice } from '@reduxjs/toolkit';

const PICTURE_INIT_STATE = {
  imageId: null
};
const pictureSlice = createSlice({
  name: 'picture',
  initialState: PICTURE_INIT_STATE,
  reducers: {
    setImageId: (state, action) => {
      state.imageId = action.payload;
    }
  },
  extraReducers: (builder) => {}
});
export const { setImageId } = pictureSlice.actions;

export default pictureSlice.reducer;
