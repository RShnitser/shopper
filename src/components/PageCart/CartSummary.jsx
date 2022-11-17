import React, { useState, useContext } from "react";
import { AppContext } from "../ShopperApp/ShopperApp";
import { APP_PAGE } from "../../scripts/constants";
import { applyDiscount } from "../../scripts/services";

const CartSummary = () => {

    const [discount, setDiscount] = useState("");

    const {currentPage, cart, setCart} = useContext(AppContext);

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
      
    let discountForm = <></>;
    let discountPrice = "-";
    let count = <></>;
    let items = <></>;
    let address= <></>;
    let paymentInfo = <></>;
    let shipmentType =<></>;
    let shippingPrice = "-";
    
    // if(cart.shippingMethod && page !== APP_PAGE.PAGE_CART) {

    //     shippingPrice = `$${cart.shippingMethod.price.toFixed(2)}`;
    // }

    // if(cart.discounts.length > 0) {
    //     discountPrice = `-$${cart.discount.toFixed(2)}`;
    // }


    if(currentPage === APP_PAGE.PAGE_CART)
    {
        //const error = this.state.error && <div className="error">{this.state.error}</div>
        discountForm = <form  className="border-bottom" onSubmit={handleOnSubmit}>
                    <div>Do you have a promo code?</div>
                    <div className="display-flex">
                        <input className="promo" type="text" placeholder="Code" onChange={handleChange}/>
                        <input className="promo bold" type="submit" value="APPLY"/>
                    </div>
                    {/* {error} */}
                 </form>
    }

    // if(page === PAGE_TYPE.PAGE_SHIPPING || page === PAGE_TYPE.PAGE_PAYMENT)
    // {
    //     count = <div className="align-right border-bottom"><strong>{`${quantity} items `}</strong>in your bag</div>
    // }

    // if(page !== PAGE_TYPE.PAGE_CART) {
       
    //     items = cart && cart.products.map(function(product) {
         
    //         return(
    //             <div className="h-container" key={product.name}>
    //                 <div className="summary-image">
    //                     <img src={product.image} alt={product.name}/>
    //                 </div>
    //                 <div>
    //                     <div>
    //                         <div className="product-bold">{product.name}</div>
    //                     </div>
    //                     <div className="h-container">
    //                         <div className="product-info summary-item">
    //                             <div>Color:</div>
    //                             <div>{product.color}</div>
    //                             <div>Size:</div>
    //                             <div>{product.size}</div>
    //                             <div>Quantity:</div>
    //                             <div>{product.quantity}</div>
    //                         </div>
    //                         <div className="summary-item summary-item-price bold">{`$${(product.price * product.quantity).toFixed(2)}`}</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     });
    // }

    // if(page === PAGE_TYPE.PAGE_PAYMENT || page === PAGE_TYPE.PAGE_CONFIRMATION) {
    //     address = <div className="border-bottom">
    //                 <h2 className="bold">Shipment Address</h2>
    //                 <div>{shipping[INPUT_SHIPPING.SHIPPING_NAME]}</div>
    //                 <div>{shipping[INPUT_SHIPPING.SHIPPING_ADDRESS]}</div>
    //                 <div>{shipping[INPUT_SHIPPING.SHIPPING_ZIP]}</div>
    //                 <div>{shipping[INPUT_SHIPPING.SHIPPING_CITY]}</div>
    //             </div>

    //     shipmentType = <>
    //                          <h2 className="bold">Shipment Method</h2>
    //                          <div className="bold">{cart.shippingMethod.name}</div>
    //                          <div>{cart.shippingMethod.description}</div>
    //                     </>

    // }

    // if(page === PAGE_TYPE.PAGE_CONFIRMATION) {

    //     paymentInfo = <div className="border-bottom">
    //         <h2 className="bold">Payment</h2>
    //             <div className="input-flex">
    //                 <div className="card-icon">
    //                     <img src={CARD_ICON[payment.cardType]} alt="card"/>
    //                 </div>
    //                 <div>{`**** ${payment[INPUT_PAYMENT.PAYMENT_NUMBER].slice(-4)}`}</div>
    //             </div>
    //     </div>
    // }

    const result =   <div className="summary cart-container padding shadow">
        <h2 className="align-right border-bottom bold">Summary</h2>
        {discountForm}
        {count}
        {items}
        <div className="border-bottom"> 
            <div className="h-container">
                <div>Cart Subtotal:</div>
                <div className="bold">{cart.subtotal.formatted_with_symbol}</div>
            </div>
            <div className="h-container">
                <div>Shipping & Handling:</div>
                <div className="bold">{shippingPrice}</div>
            </div>
            <div className="h-container">
                <div>Discount:</div>
                <div className="summary-discount bold">{discountPrice}</div>
            </div>
            <div className="h-container">
                <div className="total">Cart Total:</div>
                {/* <div className="red">{`$${cart.total.toFixed(2)}`}</div> */}
            </div>
        </div>
        {address}
        {shipmentType}
        {paymentInfo}
        {/* {button} */}
    </div>

    return(result);
}

export default CartSummary;