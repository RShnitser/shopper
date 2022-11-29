import React, { useState, useContext } from "react";
import InfoForm from "./InfoForm";
import Button from "../Button/Button";
import { AppContext } from "../ShopperApp/ShopperApp";
import { APP_PAGE } from "../../scripts/constants";
import { createCart } from "../../scripts/services";

const PageConfirmation = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {setAppPage, setAppShipping, setCart, setCheckout, setAppShippingMethod, setAppPayment, setOrder} = useContext(AppContext);

    const fetchCartData = async () => {

        try {
        
            const resCart = await createCart();

           
        
            if(resCart && resCart.response.ok) {
    
              
                const cartData = resCart.data;
                
                setCart(cartData);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        }
        catch(error) {
            setLoading(false);
            setError(true);
        }
    }

    const onHandleBack = async () => {

        setAppShipping(null);
        setCart({});
        setCheckout({});
        setAppShippingMethod({});
        setAppPayment(null);
        setOrder({});
        setLoading(true);
        await fetchCartData();
        if(!error) {
            setAppPage(APP_PAGE.PAGE_HOME);
        }
    }

    let result = null;

    if(loading) {
        result = <div>Loading...</div>;
    }
    else if(error) {
        result = <div>Error</div>;
    }
    else {

        const buttonBack = <Button 
            text="HOME"
            onClick={onHandleBack}
        />

        result = <InfoForm progress={2} buttonBack={buttonBack}>

            <h2 className="bold">Confirmation</h2>
            <div className="confirm-container">
                <div className="confirm-check">
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="confirm-text">
                    Congratulations,<br/>
                    Your order is accepted.
                </div>
            </div>

        </InfoForm>;
    }

    return result;
}

export default PageConfirmation;