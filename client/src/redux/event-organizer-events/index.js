import { createSlice } from "@reduxjs/toolkit";

const initialState={
    org_events:[]
}

const orgEventsSlice = createSlice({
    name: "orgEvent",
    initialState,
    reducers: {
      setOrganizerEvents: (state, action) => {
        state.org_events= action.payload;
      },
      
    },
  });
  export const { setOrganizerEvents } = orgEventsSlice.actions;
  
  
 
  export default orgEventsSlice.reducer;