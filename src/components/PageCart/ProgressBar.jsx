import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({progress}) => {

    const labels = [
        {icon: "fa-cart-shopping", label: "Cart"}, 
        {icon: "fa-truck", label: "Delivery"}, 
        {icon: "fa-credit-card", label: "Payment"}, 
        {icon: "fa-circle-check", label: "Confirmation"}
    ];

    const result = <div className="progress-container">
        {labels && labels.map(function(data, index) {

            let progressColor = index <= progress ? "progress-dark" : "progress-light";
            let iconColor = index <= progress ? "progress-icon-white" : "progress-icon-gray";
            let icon = index < progress ? "fa-check" : data.icon;
        
            return(
                <div key={data.label} className="progress-block">
                    <div className={`progress-icon ${progressColor} ${iconColor}`}>
                        <i className={`fa solid ${icon}`}></i>
                    </div>
                    <div className="progress-text">{data.label}</div>
                </div>
            );
        })}
    </div>

    return(result);
}

export default ProgressBar;