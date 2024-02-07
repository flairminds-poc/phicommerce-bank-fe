import { createSlice } from '@reduxjs/toolkit'

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: { value: {} },
  reducers: {
    updateFormData: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateFormData } = formDataSlice.actions

export default formDataSlice.reducer