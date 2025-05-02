import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import EventCard from "./EventCard";
import styles from "../../styles/styles";
import { CustomNextArrow, CustomPrevArrow } from "../ArrowSlider/CustomArrow"; // ✅ Import Custom Arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-12">
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div>
            <Slider {...sliderSettings}>
              {allEvents && allEvents.length > 0 ? (
                allEvents.map((event, index) => (
                  <div key={index} className="px-2">
                    <EventCard data={event} />
                  </div>
                ))
              ) : (
                <h4>No Events available!</h4>
              )}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
