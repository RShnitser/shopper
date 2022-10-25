import React, { useState } from "react";
import { APP_PAGE } from "../../scripts/constants";
import PageHome from "../PageHome/PageHome";

const ShopperApp = () => {

    // state = {
    //     page: APP_PAGE.PAGE_HOME,
    // }

    const [page, setPage] = useState(APP_PAGE.PAGE_HOME);

    //render() {

        //const {page} = this.state;

    let currentPage = null;

    switch(page) {
        case APP_PAGE.PAGE_HOME:
            currentPage = <PageHome />
        break;
        default:
        break;
    }

    return(currentPage);
    //}
}

export default ShopperApp;