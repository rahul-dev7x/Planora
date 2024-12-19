import dataUri from "datauri/parser.js";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import Event from "../models/event.model.js";

const dUri = new dataUri();

const createEvent = async (req, res) => { 
    try {
        const { name, description, location, date, ticket_price } = req.body;
        const userid = req.userIdd;

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded", success: false
            });
        }
        const fileData = dUri.format(path.extname(file.originalname).toString(), file.buffer);
        if (!fileData || !fileData.content) {
            return res.status(400).json({
                message: "File Content is not available", success: false, error: true
            });
        }
        const result = await cloudinary.uploader.upload(fileData.content, {
            folder: "Event_Image"
        });

        const event_url = result.secure_url;

        const newEvent = new Event({
            name,
            description,
            location,
            date,
            ticket_price,
            image: event_url,
            organizer: userid
        });

        await newEvent.save();

        return res.status(201).json({
            message: "Event created successfully",
            success: true,
            error: false,
            event: newEvent
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "There is an error while creating event", success: false, error: true });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, description, location, date, ticket_price } = req.body;

        const event = await Event.findByIdAndUpdate(eventId, {
            ...(name && { name: name }),
            ...(description && { description: description }),
            ...(location && { location: location }),
            ...(date && { date: date }),
            ...(ticket_price && { ticket_price: ticket_price })
        }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false, error: true });
        }

        return res.status(200).json({ message: "Event updated successfully", success: true, event });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating event", success: false, error: true });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false, error: true });
        }

        return res.status(200).json({ message: "Event deleted successfully", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting event", success: false, error: true });
    }
};

const eventsCreatedByEventOrg = async (req, res) => { 
    try {
        const userid = req.userIdd;
        const events = await Event.find({ organizer: userid });
        res.status(200).json({ message: "Events Found Successfully", success: true, error: false, events: events });

    } catch (err) {
        res.status(500).json({ message: "Error finding events", success: false, error: true });
    }
};

const allEvents = async (req, res) => { 
    try {
        const events = await Event.find();
        res.status(200).json({ message: "Events Found Successfully", success: true, error: false, events: events });

    } catch (err) {
        res.status(500).json({ message: "Error finding events", success: false, error: true });
    }
};



const filterEvents = async (req, res) => {
    try {
        const { search_keyword, date, location, ticket_price } = req.query;

        let query = {};
        let sortOrder = 1; // Default sorting is low-to-high for ticket price

        // Handle search keyword with text index
        if (search_keyword) {
            query.$text = { $search: search_keyword }; 
        }

        // Handle date filter
        if (date) {
            query.date = new Date(date); 
        }

        // Handle location filter with case-insensitive regex search
        if (location) {
            query.location = { $regex: location, $options: 'i' }; 
        }

        // Handle ticket price sorting (low-to-high or high-to-low)
        if (ticket_price) {
            if (ticket_price === 'high-to-low') {
                sortOrder = -1; // If user selects high-to-low, reverse the sorting order
            }
        }

        // Perform the query with filtering and sorting by ticket price
        const events = await Event.find(query).sort({ ticket_price: sortOrder });

        // Return filtered and sorted events
        return res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error filtering events' });
    }
};





export { createEvent, updateEvent, deleteEvent, eventsCreatedByEventOrg, allEvents ,filterEvents};