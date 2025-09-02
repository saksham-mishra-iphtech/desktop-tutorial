import React from "react";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import Header from "../Header"; 

const cardData = [
  { id: 1, title: "Counter App" },
  { id: 2, title: "TODO List" },
  { id: 3, title: "Movie Search" },
  { id: 4, title: "E-shopping Cart" },
  { id: 5, title: "Blogging App" },
  { id: 6, title: "Demo Project 6" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/dashboard/${formattedTitle}`);
  };

  return (
    <div className="flex w-full h-screen bg-[#f0f4fc]">
      <div className="hidden lg:block w-1/5">
        <Sidebar isOpen={true} setIsOpen={() => {}} />
      </div>
      <div className="flex-1 lg:w-4/5">
        <Header heading="My Demo Projects" />

        <div className="flex-1 overflow-y-auto p-5 mt-16  bg-[#f0f4fc] ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 max-w-6xl mx-auto">
            {cardData.map((card, index) => (
              <div key={card.id} className="aspect-square">
                <Card
                  id={card.id}
                  index={index}
                  title={card.title}
                  onclick={() => handleCardClick(card.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
