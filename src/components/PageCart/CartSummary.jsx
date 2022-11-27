import React, { useState, useContext } from "react";
import { AppContext } from "../ShopperApp/ShopperApp";
import { APP_PAGE, INPUT_SHIPPING, INPUT_PAYMENT, CARD_ICON } from "../../scripts/constants";
import { applyDiscount } from "../../scripts/services";

const CartSummary = ({button}) => {

    const [discount, setDiscount] = useState("");

    const {currentPage, cart, shipping, payment, setCart, appShippingMethod} = useContext(AppContext);

    //const quantity = cart.totalItems;

    const handleOnSubmit = async (e) => {

        e.preventDefault();
        try {

            const result = await applyDiscount(cart.id, discount);

            if(result && result.response.ok) {

                setCart(result.data);
            }
        }
        catch {

        }
    }

    const handleChange = ({target: {value}}) => {
        setDiscount(value);
    }

    const calculateTotal = () => {
        let result = cart.subtotal.raw;

        if(appShippingMethod.price) {
            result += appShippingMethod.price.raw;
        }
        if(cart.discount.amount_saved) {

            result -= cart.discount.amount_saved.raw;
        }

        result = result < 0 ? 0 : result;

        return result;
    }
      
    let discountForm = <></>;
    let discountPrice = "-";
    let count = <></>;
    let items = <></>;
    let address= <></>;
    let paymentInfo = <></>;
    let shipmentType =<></>;
    let shippingPrice = "-";
    
    if(appShippingMethod.price && currentPage !== APP_PAGE.PAGE_CART) {

        shippingPrice = appShippingMethod.price.formatted_with_symbol;
    }

    if(cart.discount.amount_saved) {
        discountPrice = cart.discount.amount_saved.formatted_with_symbol;
    }


    if(currentPage === APP_PAGE.PAGE_CART)
    {
        //const error = this.state.error && <div className="error">{this.state.error}</div>
        discountForm = <form  className="border-bottom" onSubmit={handleOnSubmit}>
                    <div>Do you have a promo code?</div>
                    <div className="display-flex">
                        <input className="summary-promo" type="text" placeholder="Code" onChange={handleChange}/>
                        <input className="summary-promo bold" type="submit" value="APPLY"/>
                    </div>
                    {/* {error} */}
                 </form>
    }

    if(currentPage === APP_PAGE.PAGE_SHIPPING || currentPage === APP_PAGE.PAGE_PAYMENT)
    {
        count = <div className="align-right border-bottom"><strong>{`${cart.total_items} items `}</strong>in your bag</div>
    }

    if(currentPage !== APP_PAGE.PAGE_CART) {
       
        items = cart && cart.line_items.map(function(product) {
            return(
                <div className="display-flex" key={product.name}>
                    <div className="summary-image">
                        <img src={product.image.url} alt={product.name}/>
                    </div>
                    <div className="display-grid grid-col-2 summary-item">
                        {/* <div>Color:</div>
                        <div>{product.color}</div>
                        <div>Size:</div>
                        <div>{product.size}</div> */}
                        <div>Quantity:</div>
                        <div>{product.quantity}</div>
                        <div>Price:</div>
                        <div className="summary-item bold">{`$${(product.price.raw * product.quantity).toFixed(2)}`}</div>
                    </div>
                    {/* <div>
                    </div> */}
                    {/* <div>
                        <div className="product-bold">{product.name}</div>
                    </div> */}
                    {/* <div className="display-flex space-between">
                    </div> */}
                </div>
            );
        });
    }

    if(currentPage === APP_PAGE.PAGE_PAYMENT || currentPage === APP_PAGE.PAGE_CONFIRMATION) {
        address = <div className="border-bottom">
                    <h2 className="bold">Shipment Address</h2>
                    <div>{shipping[INPUT_SHIPPING.SHIPPING_NAME]}</div>
                    <div>{shipping[INPUT_SHIPPING.SHIPPING_ADDRESS]}</div>
                    <div>{shipping[INPUT_SHIPPING.SHIPPING_ZIP]}</div>
                    <div>{shipping[INPUT_SHIPPING.SHIPPING_CITY]}</div>
                </div>

        shipmentType = <>
                             <h2 className="bold">Shipment Method</h2>
                             {/* <div className="bold">{appShippingMethod.name}</div> */}
                             <div>{appShippingMethod.description}</div>
                        </>

    }

    if(currentPage === APP_PAGE.PAGE_CONFIRMATION) {

        paymentInfo = <div className="border-bottom">
            <h2 className="bold">Payment</h2>
                <div className="display-flex">
                    <div className="card-icon">
                        <img src={CARD_ICON[payment.cardType]} alt="card"/>
                    </div>
                    <div>{`**** ${payment[INPUT_PAYMENT.PAYMENT_NUMBER].slice(-4)}`}</div>
                </div>
        </div>
    }

    const result =   <div className="summary-container shadow">
        <h2 className="align-right border-bottom bold">Summary</h2>
        {discountForm}
        {count}
        {items}
        <div className="border-bottom"> 
            <div className="display-flex space-between">
                <div>Cart Subtotal:</div>
                <div className="bold">{cart.subtotal.formatted_with_symbol}</div>
            </div>
            <div className="display-flex space-between">
                <div>Shipping & Handling:</div>
                <div className="bold">{shippingPrice}</div>
            </div>
            <div className="display-flex space-between">
                <div>Discount:</div>
                <div className="summary-discount bold">{discountPrice}</div>
            </div>
            <div className="display-flex space-between">
                <div className="bold">Cart Total:</div>
                <div className="red">{`$${calculateTotal().toFixed(2)}`}</div>
            </div>
        </div>
        {address}
        {shipmentType}
        {paymentInfo}
        {button}
    </div>

    return(result);
}

export default CartSummary;