import React from "react";
import { APP_PAGE } from "../constants";
import PageHome from "../PageHome/PageHome";

class ShopperApp extends React.Component {

    state = {
        page: APP_PAGE.PAGE_HOME,
    }

    render() {

        const {page} = this.state;

        let currentPage = null;

        switch(page) {
            case APP_PAGE.PAGE_HOME:
                currentPage = <PageHome />
            break;
            default:
            break;
        }

        return(currentPage);
    }
}

export default ShopperApp;