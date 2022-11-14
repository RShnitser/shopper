import React, { useState } from "react";
import { APP_PAGE } from "../../scripts/constants";
import PageHome from "../PageHome/PageHome";
import PageCreateAccount from "../PageLogin/PageCreateAccount";
import PageLogin from "../PageLogin/PageLogin";
import PageCart from "../PageCart/PageCart";

export const AppContext = React.createContext({
    // page: APP_PAGE.PAGE_HOME,
    // setPage: (page) => {},
})

const ShopperApp = () => {

    

    const [page, setPage] = useState(APP_PAGE.PAGE_HOME);
    const [account, setAccount] = useState(null);
    const [cart, setCart] = useState({});
    
    let currentPage = null;

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
        default:
        break;
    }

    const result = <AppContext.Provider 
        value={{
            currentPage: page, 
            setAppPage: setPage,
            account: account,
            setAccount: setAccount,
            cart: cart,
            setCart: setCart,
        }}
    >
        {currentPage}
    </AppContext.Provider>

    return(result);
}

export default ShopperApp;