import React, { useContext, useState } from "react";
import InfoForm from "./InfoForm";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { INPUT_PAYMENT, APP_PAGE } from "../../scripts/constants";
import useInputValidations from "../../hooks/UseInputValidations";
import { AppContext } from "../ShopperApp/ShopperApp";

const INIT_PAYMENT = {
    
    cardHolder: "",
    cardNumber: "",
    expire_m: "",
    expire_y: "",
    cardType: "",
    cvv: "",
}

const PagePayment = () => {

    const [payment, setPayment] = useState(INIT_PAYMENT);
    const [error, setError] = useState({});
    const [errorM, setErrorM] = useState(undefined);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(payment, error, setPayment, setError, setErrorM);

    const {setAppPage, setAppPayment} = useContext(AppContext);

    const onHandleBack = () => {
        setAppPage(APP_PAGE.PAGE_SHIPPING);
    }

    const handleOnSubmit = () => {

        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {
           
            setAppPayment(payment);
            setAppPage(APP_PAGE.PAGE_CONFIRMATION);
        }
    }

    const mapData = (data) => {

        //const {payment, error} = this.state;

        //const onChange = this.handleOnChange;
        //const onBlur = this.handleBlur;

        let result = data && data.map(function(item) {

            return(<InputField 
                key={item.label} 
                label={item.label}
                id={item.label}
                type={item.type}
                name={item.name}
                value={payment[item.name]}
                onChange={handleInput}
                maxLength={item.maxLength ? item.maxLength : 524288}
                onBlur={handleBlur}
                error={error}
                cardType={payment.cardType}
                errorM={error[`${item.name}Error`]}
            />);

        });

        return result;
    }

    const mapExp = (inputData) => {
        
        //const onChange = this.handleOnChange;
        //const onBlur = this.handleBlur;

        let errorText = error["expireError"] &&  (<div className="error">{error["expireError"]}</div>);

        let result = <>
            <label className="label-text" htmlFor={"Exp. Date"}>{"Exp. Date"}</label>
            <div className="display-flex">
                { inputData && inputData.map(function(data) {
                    return (
                        <React.Fragment key={data.name}>
                            <select className="input-field" name={data.name} defaultValue={data.children[0]} onChange={handleInput} onBlur={handleBlur}>
                            
                                {data.children && data.children.map(function(child, index) {
                                    return(
                                        <option
                                            disabled={index === 0}
                                            hidden={index === 0}
                                            key={child} 
                                            value={child}>
                                            {child}
                                        </option>
                                    );
                                })}
                            </select>
                        </React.Fragment>
                    );
                })}
            </div>
            <div> {errorText}</div>
        </>;

        return result;
    }

    const paymentData1 = [
        {label: "Cardholder Name", type: "text", name: INPUT_PAYMENT.PAYMENT_CARDHOLDER},
        {label: "Card Number", type: "card", name: INPUT_PAYMENT.PAYMENT_NUMBER, maxLength: 19},
    ];

    const months = [
        "Month", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
    ];

    const years = [
        "Year", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030",
    ];

    const paymentData2 = [
        {name: INPUT_PAYMENT.PAYMENT_EXPIRE_M, children: months},
        {name: INPUT_PAYMENT.PAYMENT_EXPIRE_Y, children: years},
    ];

    const paymentData3 = [
        {label: "CVV", type: "text", name: INPUT_PAYMENT.PAYMENT_CVV, maxLength: 4},
    ]

    const buttonNext = <Button 
        text="CHECKOUT"
        onClick={handleOnSubmit}
    />

    const buttonBack = <Button 
        text="HOME"
        onClick={onHandleBack}
    />

    const result = <InfoForm progress={2} buttonBack={buttonBack} buttonNext={buttonNext}>
    
    {/* <ProgressBar progress={2}/> */}

    <div className="display-grid grid-col-3">
        {mapData(paymentData1)}
        {mapExp(paymentData2)}
        {mapData(paymentData3)}
    </div>
   
   

    </InfoForm>;

    return(result);
}

export default PagePayment;