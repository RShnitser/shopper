import React from "react";
import CartSummary from "./CartSummary";

const InfoForm = ({children, button}) => {

    const result = <div className="info-flex page-margin shadow">
        <div className="cart-flex">
            {children}
        </div>
        <CartSummary button={button}/>
    </div>

    return result;
}

export default InfoForm;