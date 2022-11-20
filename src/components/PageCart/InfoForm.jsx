import React from "react";
import CartSummary from "./CartSummary";
//import ProgressBar from "./ProgressBar";

const InfoForm = ({children, button}) => {

    const result = <div className="info-flex page-margin shadow">
        <div className="cart-flex">
            {/* <ProgressBar progress={progress}/> */}
            {children}
        </div>
        <CartSummary button={button}/>
    </div>

    return result;
}

export default InfoForm;