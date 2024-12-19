import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllEventsCard from "./AllEventsCard";
import { setFilter } from "../redux/all-events";

const Events = () => {
  const all_events = useSelector((state) => state.event.all_events);

  // Extract unique locations from all_events
  const uniqueLocations = [...new Set(all_events.map((event) => event.location))];
const dispatch=useDispatch();
  const [filterss, setFilterss] = useState({
    search_keyword: "",
    date: "",
    location: "",
    ticket_price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterss((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log({ ...filterss, [name]: value });
  };

  useEffect(()=>{
dispatch(setFilter(filterss))
  },[filterss])
  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Search Box */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            name="search_keyword"
            placeholder="Search events..."
            className="w-full p-2 border rounded"
            value={filterss.search_keyword}
            onChange={handleInputChange}
          />
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full p-2 border rounded"
            value={filterss.date}
            onChange={handleInputChange}
          />
        </div>

        {/* Location as Radio Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="space-y-2">
            {uniqueLocations.map((location, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value={location}
                  id={`location-${index}`}
                  className="mr-2"
                  onChange={handleInputChange}
                />
                <label htmlFor={`location-${index}`}>{location}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Price Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ticket Price</label>
          <select
            name="ticket_price"
            className="w-full p-2 border rounded"
            value={filterss.ticket_price}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="0-500">0-500 Rs</option>
            <option value="500-1000">500-1000 Rs</option>
            <option value="1000-2000">1000-2000 Rs</option>
            <option value="2000+">2000+ Rs</option>
          </select>
        </div>
      </div>

      {/* Events Display Section */}
      <div className="w-3/4 p-4">
        <AllEventsCard />
      </div>
    </div>
  );
};

export default Events;
