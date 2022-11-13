import React, {useState} from "react";

const DropDown = ({title, children}) => {

    const DROPDOWN_STATE = {
        DROPDOWN_OPEN: "o",
        DROPDOWN_CLOSED: "c",
    };

    const [open, setOpen] = useState(DROPDOWN_STATE.DROPDOWN_CLOSED);

    const handleOnClick = () => {

            const openState = open === DROPDOWN_STATE.DROPDOWN_OPEN ? 
                DROPDOWN_STATE.DROPDOWN_CLOSED : 
                DROPDOWN_STATE.DROPDOWN_OPEN;
    
            setOpen(openState);
        
    }

    let menu = "open";
    let caret = "down";

    if(open === DROPDOWN_STATE.DROPDOWN_CLOSED) {
        menu = "closed"
        caret = "up";
    }

    const result = <div onClick={handleOnClick}>
        <div className="dropdown-title">
            <div >{title}</div>
            <i className={`fa-solid fa-caret-${caret}`}></i>
        </div>
        <ul className={`dropdown-menu ${menu}`} >
            {children}
        </ul>
    </div>

    return(result);
}

export const DropDownItem = ({label, onClick}) => {

    const result = <li>
        <button className="dropdown-item" type="button" onClick={onClick}>
            {label}
        </button>
    </li>

    return result;
}

export default DropDown;