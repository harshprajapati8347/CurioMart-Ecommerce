import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <Header activeHeading={4} />

          {/* Hero Section */}
          <div className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-4 px-4 text-center shadow-md">
            <h1 className="text-4xl font-extrabold mb-2">
              🔥 Today's Hot Events & Festival Deals
            </h1>
            <p className="text-lg font-medium">
              Don’t miss out on limited-time offers. Act fast!
            </p>
          </div>

          {/* Events Container */}
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event) => (
                <EventCard key={event._id} data={event} active={true} />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No active events right now.
              </p>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
