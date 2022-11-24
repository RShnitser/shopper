import React from "react";
import CartSummary from "./CartSummary";
import ProgressBar from "./ProgressBar";

const InfoForm = ({children, progress, buttonBack, buttonNext}) => {

    const progressBar = progress ? <ProgressBar progress={progress}/> : null;

    const result = <div className="info-flex page-margin shadow">
        <div className="cart-flex">
            <div>
                {progressBar}
                {children}
            </div>
            {buttonBack}
        </div>
        <CartSummary button={buttonNext}/>
    </div>

    return result;
}

export default InfoForm;