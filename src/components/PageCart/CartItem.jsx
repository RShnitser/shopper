import React, { useContext } from "react";
import { removeItemFromCart, updateItemInCart } from "../../scripts/services";
import { AppContext } from "../ShopperApp/ShopperApp";

const CartItem = ({product}) => {

    const {cart, setCart} = useContext(AppContext);

    const handleOnChange = async ({target: {name, value}}) => {
        try {

            const result = await updateItemInCart(cart.id, name, value);

            if(result && result.response.ok) {

                setCart(result.data);
            }
        }
        catch {

        }
    }

    const handleRemoveItem = async (productID) => {
        try {

            const result = await removeItemFromCart(cart.id, productID);

            if(result && result.response.ok) {

                setCart(result.data);
            }
        }
        catch {

        }
    }

    const result = <div className="display-flex">
        
        <div className="product-image">
            <img src={product.image.url} alt={product.name}/>
        </div>

        <div className="cart-item-info">
            <div>
                {product.name}
            </div>

            <div className="display-flex">
                <button className="product-button" 
                        type="button" 
                        onClick={() => {handleRemoveItem(product.id)}}  
                    >
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>

                <input name={product.id} type="number" min="0" value={product.quantity} onChange={handleOnChange}/>
            </div>

        </div>
       
        <div className="bold">{`$${(product.price.raw * product.quantity).toFixed(2)}`}</div>

        {/* <div className="product-container">
            <div className="product-info-container">
                <div>
                </div>
            </div>
        </div> */}

        {/* <div className="bold">{product.price.formatted_with_symbol}</div> */}
       
       
    </div>

    return(result);
}

export default CartItem;