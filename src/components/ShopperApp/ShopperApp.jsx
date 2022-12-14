import React, { useState, useEffect } from "react";
import { APP_PAGE } from "../../scripts/constants";
import PageHome from "../PageHome/PageHome";
import PageCreateAccount from "../PageLogin/PageCreateAccount";
import PageLogin from "../PageLogin/PageLogin";
import PageCart from "../PageCart/PageCart";
import { createCart } from "../../scripts/services";
import PageShipping from "../PageCart/PageShipping";
import PagePayment from "../PageCart/PagePayment";
import PageConfirmation from "../PageCart/PageConfirmation";

export const AppContext = React.createContext({})

const ShopperApp = () => {
    
    const [page, setPage] = useState(APP_PAGE.PAGE_HOME);
    const [account, setAccount] = useState(null);
    const [appShipping, setAppShipping] = useState(null);
    const [cart, setCart] = useState({});
    const [checkout, setCheckout] = useState({});
    const [appShippingMethod, setAppShippingMethod] = useState({});
    const [appPayment, setAppPayment] = useState(null);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

   

    useEffect(() => {
        
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

        fetchCartData();

    }, []);
    
    let currentPage = null;
    let result = null;

    if(loading) {
        result = <div>Loading...</div>;
    }
    else if(error) {
        result = <div>Error</div>;
    }
    else {
        switch(page) {
            case APP_PAGE.PAGE_HOME:
                currentPage = <PageHome />
            break;
            case APP_PAGE.PAGE_LOGIN:
                currentPage = <PageLogin />
            break;
            case APP_PAGE.PAGE_CREATE:
                currentPage = <PageCreateAccount />
            break;
            case APP_PAGE.PAGE_CART:
                currentPage = <PageCart />
            break;
            case APP_PAGE.PAGE_SHIPPING:
                currentPage = <PageShipping />
            break;
            case APP_PAGE.PAGE_PAYMENT:
                currentPage = <PagePayment />
            break;
            case APP_PAGE.PAGE_CONFIRMATION:
                currentPage = <PageConfirmation />
            break;
            default:
            break;
        }

        result = <AppContext.Provider 
            value={{
                currentPage: page, 
                setAppPage: setPage,
                account: account,
                setAppAccount: setAccount,
                shipping: appShipping,
                setAppShipping: setAppShipping,
                cart: cart,
                setCart: setCart,
                checkout: checkout,
                setCheckout: setCheckout,
                appShippingMethod: appShippingMethod,
                setAppShippingMethod: setAppShippingMethod,
                payment: appPayment,
                setAppPayment: setAppPayment,
                order: order,
                setOrder: setOrder,
            }}
        >
            {currentPage}
        </AppContext.Provider>
    }

    return(result);
}

export default ShopperApp;