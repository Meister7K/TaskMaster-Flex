import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn-solid", "btn-outline", "btn-outline-rules", "btn-red", "signIn-btn"];

const SIZES = ["btn-medium", "btn-large", "btn-large-rules"];

export const Button = ({
  children,
  type,
  onClick,
  buttonstyle,
  buttonSize,
  destination,
}) => {
  const checkButtonStyle = STYLES.includes(buttonstyle)
    ? buttonstyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={destination} className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
