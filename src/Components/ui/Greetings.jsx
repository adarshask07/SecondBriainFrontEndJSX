import React from "react";
import { useSelector } from "react-redux";

const Greeting = ({username}) => {

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="text-white text-lg font-semibold">
      {getCurrentGreeting()}, {username}!
    </div>
  );
};

export default Greeting;
