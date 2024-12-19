import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa'; // For location icon
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const AllEventsCard = ({ events }) => {
  const navigate = useNavigate();
  
  const all_events=useSelector(state=>state.event.all_events);
  const filters=useSelector((state)=>state.event.filters);
  console.log(filters);
  const [filterEvents,setFilterEvents]=useState(all_events);
  useEffect(()=>{

if (filters) {
  let filteredEvents = all_events;

  // Filter by search keyword (name or location)
  if (filters.search_keyword) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(filters.search_keyword.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search_keyword.toLowerCase())
    );
  }

  // Filter by location
  if (filters.location) {
    filteredEvents = filteredEvents.filter(
      (event) => event.location.toLowerCase() === filters.location.toLowerCase()
    );
  }

  // Filter by ticket price range
  if (filters.ticket_price) {
    const [minPrice, maxPrice] = filters.ticket_price.split("-").map(Number);
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.ticket_price >= minPrice && (maxPrice ? event.ticket_price <= maxPrice : true)
    );
  }

  // Filter by date (single date filter)
  if (filters.date) {
    const eventDate = new Date(event.date).toLocaleDateString();
    const filterDate = new Date(filters.date).toLocaleDateString();
    filteredEvents = filteredEvents.filter((event) => eventDate === filterDate);
  }

  setFilterEvents(filteredEvents);
} else {
  setFilterEvents(all_events);
}
  },[all_events,filters])


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filterEvents.length > 0 ? (
        filterEvents.map((event) => (
          <div
            key={event._id}
            className="w-full h-[400px] p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Event Image */}
            {event.image && (
              <div className="mb-4">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-36 object-cover rounded-md"
                />
              </div>
            )}

            {/* Event Name */}
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{event.name}</h3>

            {/* Location */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaMapMarkerAlt className="text-gray-600" />
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {event.description}
            </p>

            {/* Ticket Price */}
            <p className="text-sm text-gray-700 font-semibold mb-4">
              Ticket Price: ${event.ticket_price}
            </p>

            {/* View Details Button */}
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-500"
              onClick={() => navigate(`/event-details/${event._id}`)}
            >
              View Details
            </Button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events available.</p>
      )}
    </div>
  );
};

export default AllEventsCard;
