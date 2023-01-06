import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, classStyle }) => {
  return (
    <div className={Style.box}>
      {/* checking btn name */}
      <button
        className={`${Style.button} ${classStyle}`}
        // onClick={() => handleClick()}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
