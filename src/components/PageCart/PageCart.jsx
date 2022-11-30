import React, {useContext} from "react";
import { APP_PAGE } from "../../scripts/constants";
import Button from "../Button/Button";
import { AppContext } from "../ShopperApp/ShopperApp";
import CartItem from "./CartItem";
import InfoForm from "./InfoForm";
import "./PageCart.css";

const PageCart = () => {

    const {setAppPage, cart, account} = useContext(AppContext);

    const onHandleBack = () => {
        setAppPage(APP_PAGE.PAGE_HOME);
    }

    const onHandleNextPage = () => {
        if(cart.line_items.length && account) {
            setAppPage(APP_PAGE.PAGE_SHIPPING);
        }
        else if(cart.line_items.length && !account) {
            setAppPage(APP_PAGE.PAGE_LOGIN);
        }
    }

    const mapProducts = () => {

        const result = cart.line_items && cart.line_items.map(function(product) {
            return <CartItem key={product.name} product={product}/>;
        });
    
        return(result);
    }


    let products = <div>No items in cart</div>;

    if(cart.line_items.length) {
        products = mapProducts()
    }
           
    const buttonNext = <Button 
        text="CHECKOUT"
        onClick={onHandleNextPage}
    />

    const buttonBack =  <Button 
        text="BACK TO HOME"
        className="product-button"
        onClick={onHandleBack}
    />

    const result = <InfoForm progress={0} buttonBack={buttonBack} buttonNext={buttonNext}>
       
        {products}
       
       
    </InfoForm>;

    return(result);
}

export default PageCart;