//import Commerce from "@chec/commerce.js";

//export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);


const COMMERCE_API = process.env.REACT_APP_CHEC_PUBLIC_KEY;

export async function fetchProducts() {

    return new Promise(async function(success, failure) {
        try {

            const url = "https://api.chec.io/v1/products";

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {method: "GET", headers: headers});
            if(response.ok) {
    
                const json = await response.json();
    
                const data = json.data.map(function(product) {
                    return ({
                        name: product.name,
                        description: product.description,
                        price: product.price.raw,
                    });
                });
    
                success({response, data});
            }
            else {
                failure({error: "invalid http request"});
            }
        
        }
        catch(error) {
            failure(error);
        }
    });
}

