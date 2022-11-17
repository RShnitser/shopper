import React from "react";
import "./Button.css";

const Button = ({text, onClick}) => {

    const result = <button type="button" className="btn" onClick={onClick}>
        <div>{text}</div>
    </button>

    return(result);
}

export default Button;
