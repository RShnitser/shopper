import React from "react";

const CartItem = (product, quantity) => {

    const handleOnChange = () => {

    }

    const result = <div className="cart-item border-bottom">
        
        <button className="product-button" 
                type="button" 
                onClick={() => {handleOnChange({target:{name: product.id, value: 0}})}}  
            >
            <i className="fa-solid fa-circle-xmark"></i>
        </button>
       
        <div className="product-container">
            <div className="product-info-container">
                <div className="product-image">
                    <img src={product.image} alt={product.name}/>
                </div>
                <div>
                    <div className="product-bold">
                        {product.name}
                    </div>
                    <div className="product-info">
                        <div>Color:</div>
                        <div className="product-bold">{product.color}</div>
                        <div>Size:</div>
                        <div className="product-bold">{product.size}</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bold">{`$${product.price}`}</div>
       
        <input name={product.id} type="number" min="0" value={quantity} onChange={handleOnChange}/>
        
        <div className="bold">{`$${(product.price * quantity).toFixed(2)}`}</div>
    </div>

    return(result);
}

export default CartItem;