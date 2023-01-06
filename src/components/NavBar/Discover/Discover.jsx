import React from "react";
import { Link, useNavigate } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  let navigate = useNavigate();
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "search",
    },
    {
      name: "Author Profile",
      link: "author-profile",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account-setting",
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link to={`${el.link}` }>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
