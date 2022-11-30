import React from "react";
import CartSummary from "./CartSummary";
import ProgressBar from "./ProgressBar";

const InfoForm = ({children, progress, buttonBack, buttonNext, errorM}) => {

    const progressBar = progress ? <ProgressBar progress={progress}/> : null;

    const errorText =  errorM && <div className="error label-container">{errorM}</div>

    const result = <div className="info-flex page-margin shadow">
        <div className="cart-flex">
            <div>
                {progressBar}
                {errorText}
                {children}
            </div>
            {buttonBack}
        </div>
        <CartSummary button={buttonNext}/>
    </div>

    return result;
}

export default InfoForm;