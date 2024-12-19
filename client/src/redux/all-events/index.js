import { createSlice } from "@reduxjs/toolkit";

const initialState={
    all_events:[],
    filters:{
      search_keyword:"",
      date:"",
      location:"",
      ticket_price:""
    }
}

const eventSlice = createSlice({
    name: "allEvent",
    initialState,
    reducers: {
      setAllEvents: (state, action) => {
        state.org_events= action.payload;
      },
      setFilter:(state,action)=>{
        state.filters={...state.filters,...action.payload}
      }
      
    },
  });
  export const { setAllEvents,setFilter } = eventSlice.actions;
  
  
 
  export default eventSlice.reducer;