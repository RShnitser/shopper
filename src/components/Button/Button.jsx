import React from "react";
import "./Button.css";

const Button = ({text, onClick, className}) => {

    const btnClass = className ? className : "btn";

    const result = <button type="button" className={btnClass} onClick={onClick}>
        <div>{text}</div>
    </button>

    return(result);
}

export default Button;
