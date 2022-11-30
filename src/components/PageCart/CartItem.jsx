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

    const handleRemoveItem = async () => {
        try {

            const result = await removeItemFromCart(cart.id, product.id);

            if(result && result.response.ok) {

                setCart(result.data);
            }
        }
        catch {

        }
    }

    const result = <div className="cart-item-container">
        
        <div className="cart-item-col cart-item-image">
            <img src={product.image.url} alt={product.name}/>
        </div>

        <div className="cart-item-col cart-item-info">
            <div>
                {product.name}
            </div>

            <div className="display-flex cart-item-buttons">
                <button className="cart-item-button" 
                        type="button" 
                        onClick={handleRemoveItem}  
                    >
                    <i className="fa-solid fa-trash-can"></i>
                </button>

                <input name={product.id} type="number" min="0" value={product.quantity} onChange={handleOnChange}/>
            </div>

        </div>
       
        <div className="cart-item-price cart-item-col bold">{`$${(product.price.raw * product.quantity).toFixed(2)}`}</div>
    </div>

    return(result);
}

export default CartItem;