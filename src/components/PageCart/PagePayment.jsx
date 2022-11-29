import React, { useContext, useState } from "react";
import InfoForm from "./InfoForm";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { INPUT_PAYMENT, APP_PAGE } from "../../scripts/constants";
import useInputValidations from "../../hooks/UseInputValidations";
import { AppContext } from "../ShopperApp/ShopperApp";
import { captureOrder } from "../../scripts/services";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [errorM, setErrorM] = useState(undefined);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(payment, error, setPayment, setError, setErrorM);

    const {account, checkout, shipping, appShippingMethod, setAppPage, setAppPayment, setOrder} = useContext(AppContext);

    // const sanitizedLineItems = (lineItems) => {
    //     return lineItems.reduce((data, lineItem) => {
    //       const item = data;
    //       let variantData = null;
    //       if (lineItem.selected_options.length) {
    //         variantData = {
    //           [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
    //         };
    //       }
    //       item[lineItem.id] = {
    //         quantity: lineItem.quantity,
    //         variants: variantData,
    //       };
    //     return item;
    //     }, {});
    // }
      
    const handleCaptureCheckout = async () => {

        const orderData = {
            //line_items: sanitizedLineItems(cart.line_items),
            line_items: checkout.line_items,

            customer: {
              firstname: account.firstName,
              lastname: account.lastName,
              email: account.email,
            },

            shipping: {
              name: shipping.title,
              street: shipping.address,
              town_city: shipping.city,
              county_state: shipping.state,
              postal_zip_code: shipping.zip,
              country: shipping.country,
            },

            fulfillment: {
              shipping_method: appShippingMethod.id
            },

            payment: {
              gateway: "test_gateway",
              card: {
                number: payment.cardNumber,
                //number: "4242424242424242",
                expiry_month: payment.expire_m,
                expiry_year: payment.expire_y,
                cvc: payment.cvv,
                postal_zip_code: shipping.zip,
              },
            },
        };

        try {
            
            setLoading(true);
            const resOrder = await captureOrder(checkout.id, orderData);

           
        
            if(resOrder && resOrder.response.ok) {
    
              
                const orderData = resOrder.data;
                //console.log(orderData);
                setOrder(orderData);
                setAppPage(APP_PAGE.PAGE_CONFIRMATION);
                setLoading(false)
                
            }
            else {
                setLoading(false);
            }
        }
        catch(error) {
           setLoading(false);
           setErrorM("Error processing payment");
           console.error(error);
            //setError(true);
        }
    }

    const onHandleBack = () => {
        setAppPage(APP_PAGE.PAGE_SHIPPING);
    }

    const handleOnSubmit = async () => {

        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {
           
            setAppPayment(payment);
            //setAppPage(APP_PAGE.PAGE_CONFIRMATION);
            await handleCaptureCheckout();
        }
    }

    const mapData = (data) => {

        //const {payment, error} = this.state;

        //const onChange = this.handleOnChange;
        //const onBlur = this.handleBlur;

        let result = data && data.map(function(item) {

            //console.log(payment);

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

    let result = null;
    
    if(loading) {
        result = <div>Processing Payment...</div>;
    }
    // else if(error) {
        //     result = <div>Error</div>;
        // }
    else {

        result = <InfoForm progress={2} buttonBack={buttonBack} buttonNext={buttonNext}>
        
    

        <h2 className="bold">Payment Information</h2>

        <div className="display-grid grid-col-3">
            {mapData(paymentData1)}
            {mapExp(paymentData2)}
            {mapData(paymentData3)}
        </div>
   
    </InfoForm>;
    }

    return(result);
}

export default PagePayment;