
import { allEvents, createEvent, deleteEvent, eventsCreatedByEventOrg, filterEvents, updateEvent } from "../controller/event.controller.js";
import isEventOrg from "../middleware/isEventOrg.js";
import upload from "../config/multer.js";
import express  from 'express';



const route = express.Router();


route.post("/create-event", 
    isEventOrg, upload.single("image"), 
    createEvent)
route.put("/update-event/:id", 
    isEventOrg, 
    updateEvent)
route.delete("/delete-event", 
    isEventOrg,
    deleteEvent)

route.get("/created-event", 
    isEventOrg,
    eventsCreatedByEventOrg)
route.get("/all-event",  
    allEvents)
    route.get("/events",filterEvents)
export default route;