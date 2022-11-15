import React from "react";
import CartSummary from "./CartSummary";
import ProgressBar from "./ProgressBar";

const InfoForm = ({progress, children}) => {

    const result = <div className="shadow">
        <ProgressBar progress={progress}/>
        <CartSummary />
        {children}
    </div>

    return result;
}

export default InfoForm;