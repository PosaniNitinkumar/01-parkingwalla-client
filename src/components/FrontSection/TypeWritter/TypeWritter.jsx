import React from "react";
import Typewriter from "typewriter-effect";

// INTERNAL IMPORT
import Style from "./TypeWritter.module.css";

const TypeWritter = () => {
  return (
    <div>
      <h1>
        Discover A New Era Of Cool
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<span style="color: #27ae60;">NFTs.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #FFBF00">Collectibles</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #DE3163">Digital Art.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #00d2ff;">Music.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #FF69B4">Sports.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #A020F0">Fashion.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #FF5733;">Memes.</span>')
              .pauseFor(1500)
              .deleteAll()
              .typeString('<span style="color: #6495ED;">And More.</span>')
              .pauseFor(1500)
              .deleteAll()
              .start();
          }}
        />
      </h1>
    </div>
  );
};

export default TypeWritter;
