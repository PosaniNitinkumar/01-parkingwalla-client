import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "./FrontSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import TypeWritter from "./TypeWritter/TypeWritter";

import { Context } from "../../context/Context"

const FrontSection = () => {
  const { walletAddress, titleData } = useContext(Context);
  console.log(walletAddress);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <TypeWritter />
          <p>{titleData}</p>
          <Button btnName="Explore" />
        </div>
        <div className={Style.heroSection_box_right}>
          <img
            src={images.frontsection}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default FrontSection;
