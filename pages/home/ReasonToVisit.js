import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { TbToolsKitchen2, TbAirConditioning } from "react-icons/tb";
import { RiFridgeLine } from "react-icons/ri";
import { MdBalcony, MdOutlineCleaningServices } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { BsSpeaker } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { MdTv } from 'react-icons/md';

export default function ReasonToVisit() {
  const reasons = [
    { name: "Kitchen", icon: <TbToolsKitchen2 /> },
    { name: "Refrigerator", icon: <RiFridgeLine/> },
    { name: "Balcony", icon: <MdBalcony /> },
    { name: "Internet Access", icon: <FaWifi/> },
    { name: "Free Parking", icon: <LuParkingCircle /> },
    { name: "Daily housekeeping", icon: <MdOutlineCleaningServices/> },
    { name: "Air conditioning", icon: <TbAirConditioning/> },
    { name: "Prime location", icon: <GrMapLocation/> },
    { name: "Music Speakers", icon: <BsSpeaker/> },
    { name: "Games & Books", icon: <PiBooks /> },
    { name: "Pool / Jacuzzi", icon: <MdOutlinePool /> },
    { name: "TV", icon: <MdTv/> }
  ];
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false, 
  };

  return (
    <div className="visit-us-sec relative">
      <Image
        blurDataURL="/images/visitbg.jpg?q=1"
        src="/images/visitbg.jpg"
        alt="QUAINTSPACES JAIPUR Reason to visit"
        layout="fill"
        objectFit="cover"
        style={{ zIndex: -1 }}
        
        loading="lazy"
      />
      <div className="container capitalize mx-auto relative z-10">
        <h2>Amenities we offer</h2>
        <div className="smart-box">
          <div className="carousel-wrapper">
          <Slider {...settings}>
              {reasons.map((reason, index) => (
                <div className="iteam" key={index} >
                  <div className="flex flex-col gap-2">
                    {reason?.icon}
                    {reason?.name}
                    </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}