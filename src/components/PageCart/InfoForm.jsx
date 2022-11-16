import React from "react";
import CartSummary from "./CartSummary";
import ProgressBar from "./ProgressBar";

const InfoForm = ({progress, children}) => {

    const result = <div className="display-flex shadow">
        <div>
            <ProgressBar progress={progress}/>
            {children}
        </div>
        <CartSummary />
    </div>

    return result;
}

export default InfoForm;