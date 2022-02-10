import React from "react";

const Choice = ({ onChoose, choice, name }) => {
  return (
    <div className="choice">
      <input
        id={name}
        className="choice__input"
        name={name}
        type="radio"
        onChange={onChoose}
        value={choice}
      />
      <p className="paragraph">{choice}</p>
    </div>
  );
};

export default Choice;
