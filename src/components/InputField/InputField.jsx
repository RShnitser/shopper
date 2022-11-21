import React, { useState } from "react";
//import { CARD, CARD_ICON } from "../../scripts/constants";
import "./InputField.css";

const InputField = ({label, error, errorM, type, children, value, cardType, ...props }) => {

    const [passVisible, setPassVisible] = useState(false);

    const handleToggle = () => {
        
       setPassVisible(!passVisible);
    }

    let finalType = type;
    let result = null;
    let input;
    let cardIcon = null;
    // const vertical = true;
    
    const passwordEye = type === "password" ? (
        <button type="button" className="input-icon" onClick={handleToggle}>
            {passVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
        </button>
    ) : null;

    const inputClass = errorM ? "input-field error-background" : "input-field";

    const passDesc = label === "Password" && (
        <div className="label-container grid-span-3">
            Password must be 8-20 characters, including: at least
            one capital letter, at least one small letter, one number
            and one special character -!@#$%^&*()_+
        </div>
    );
    
    if(passVisible) {
        finalType = "text";
    }

    if(type === "card") {
        // finalType = "text";
        // if((!error || !error.cardError) && CARD.includes(cardType)) {
        //     cardIcon = <div className="card-icon card-icon-margin">
        //         <img src={CARD_ICON[cardType]} alt="card"/>
        //     </div>
        // }
    }

    if(type === "option")
    {

        input = <select className="input-option"  {...props}>
                    {/* <option disabled hidden value={0}>Select</option> */}
                    {
                        children && children.map(function(data) {
                            return(
                                <option key={data} value={data}>{data}</option>
                            );
                    })}
                </select>
    }
    else {
        input =  <input className={inputClass} value={value} type={finalType}{...props}/>;
    }

    // if(vertical) {
        result = <>
                <label className="label-text grid-span-2" htmlFor="data.label">
                {label}
            </label>
            <div className="error text-end">{errorM || ""}</div>
            <div className="display-flex grid-span-3">
                {input}
                {passwordEye}
                {cardIcon}
            </div>
            {passDesc}
        </>
    // }
    // else {
    //     const error = errorM ? <div className="error grid-span-2">{errorM}</div> : <div className="grid-span-2"></div>;
    //     result = <>
    //     <label className="label-text" htmlFor="data.label">
    //         {label}
    //     </label>
    //     <div className="input-flex grid-span-2">
    //         {input}
    //         {passwordEye}
    //         {cardIcon}
    //     </div>
    //     <div></div>
    //     {passDesc}
    //     {error}
    // </>;
    // }

    return(result);
}

export default InputField;