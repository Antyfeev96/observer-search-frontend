import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export const toolkitSlice = createSlice({
  name: 'myState',

  initialState,

  reducers: {
    searchSkillsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    searchSkillsFailure(state, action) {
      state.error = action.error.message;
      state.loading = false;
    },
    searchSkillsSuccess(state, action) {
      const items = action.payload;
      return state = {
        ...state,
        items,
        loading: false,
        error: null,
      };
    },
    changeSearchField(state, action) {
      state.search = action.payload;
      if (state.search === '') {
        state.items = []
      }
    }
  }
})


export default toolkitSlice.reducer;
export const { searchSkillsRequest, searchSkillsFailure, searchSkillsSuccess, changeSearchField } = toolkitSlice.actions;
