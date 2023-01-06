import React from "react";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./MintMenu.module.css";

const MintMenu = () => {
  //--------MintMenu NAVIGATION MENU
  const mintmenu = [
    {
      name: "Indian Night NFT's",
      link: "indian-nights",
    },
    {
      name: "Indian Culture NFT's",
      link: "indian-culture",
    },
    {
      name: "Indian Food NFT's",
      link: "indian-food",
    },
    {
      name: "Indian Festivals NFT's",
      link: "indian-festivals",
    },
    {
      name: "Indian Sports NFT's",
      link: "indian-sports",
    },
  ];
  return (
    <div>
      {mintmenu.map((el, i) => (
        <div key={i + 1} className={Style.mintmenu}>
          <Link to={`${el.link}`}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default MintMenu;
