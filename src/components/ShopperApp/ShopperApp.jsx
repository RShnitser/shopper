import React, { useState } from "react";
import { APP_PAGE } from "../../scripts/constants";
import PageHome from "../PageHome/PageHome";
import PageCreateAccount from "../PageLogin/PageCreateAccount";
import PageLogin from "../PageLogin/PageLogin";

export const PageContext = React.createContext({
    // page: APP_PAGE.PAGE_HOME,
    // setPage: (page) => {},
})

const ShopperApp = () => {

    

    const [page, setPage] = useState(APP_PAGE.PAGE_HOME);

   

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
        default:
        break;
    }

    const result = <PageContext.Provider value={{currentPage: page, setAppPage: setPage}}>
        {currentPage}
    </PageContext.Provider>

    return(result);
}

export default ShopperApp;