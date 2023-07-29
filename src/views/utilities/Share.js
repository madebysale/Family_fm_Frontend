import React, { useState } from "react";


import './Invoice.css';




const Share = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "",
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="create-invo-1" >Share 🔗</button>
      </RWebShare>
    </div>
  );
};

export default Share;
