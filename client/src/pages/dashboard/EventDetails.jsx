import {  useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateEventDialog from "./UpdateEventDialog";
import { Button } from "../../components/ui/button";

const EventDetails = () => {
  const orgEvents = useSelector((state) => state.orgEvent.org_events);
  const { id: eventId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const event = orgEvents.find((data) => data._id === eventId);
  
  if (!event) {
    return <p className="text-center text-gray-500">Event not found or still loading...</p>;
  }

  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{event.name }</h1>
        <Button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
          onClick={() => setIsOpen(true)}
        >
          Edit Details
        </Button>
      </div>

      
      {event.image && (
        <div className="flex justify-center">
          <img
            src={event.image}
            alt={event.title || "Event Image"}
            className="max-w-full h-auto rounded-md shadow-lg"
          />
        </div>
      )}

      {/* Event Details Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Description</h3>
          <p className="text-gray-600">{event.description || "No description provided."}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Date</h3>
          <p className="text-gray-600">{event.date || "No date specified."}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">{event.location || "No location specified."}</p>
        </div>
      </div>

      {/* Update Event Dialog */}
      <UpdateEventDialog open={isOpen} onClose={() => setIsOpen(false)} event={event}/>
    </div>
  );
};

export default EventDetails;

