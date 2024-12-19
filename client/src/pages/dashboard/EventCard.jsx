import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineDescription } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect} from "react";

import { api } from "@/config/api";
import { useDispatch, useSelector } from "react-redux";
import { ORGANIZER_CREATED_EVENTS } from "@/config";
import { setOrganizerEvents } from '@/redux/event-organizer-events';

const EventCard = () => {
    
    const dispatch = useDispatch();
    const orgEvents = useSelector((state) => state.orgEvent.org_events);
    console.log(orgEvents)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get(ORGANIZER_CREATED_EVENTS);
                if (response.data.success) {
                    dispatch(setOrganizerEvents(response.data.events));
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [dispatch]);


   

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {orgEvents.map((event, index) => (
                <div
                    key={index} 
                    className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{event.name}</h1>
                        <p className="text-sm text-gray-500">{event.date}</p>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <CiLocationArrow1 size={18} className="text-gray-600" />
                            <p className="text-sm text-gray-700">{event.location}</p>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <IoIosPricetags size={18} className="text-gray-600" />
                            <p className="text-sm text-gray-700">₹{event.ticket_price}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MdOutlineDescription size={18} className="text-gray-600" />
                            <p className="text-sm text-gray-700 truncate w-64">{event.description}</p>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-100 text-center space-x-4 flex justify-between items-center">
                        <Button
                            className="py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            onClick={() => navigate(`/dashboard/event-details/${event._id}`)}
                        >
                            View Event
                        </Button>
                    </div>

                    
                </div>
            ))}
        </div>
    );
};

export default EventCard;
