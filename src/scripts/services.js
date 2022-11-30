const COMMERCE_API = process.env.REACT_APP_CHEC_PUBLIC_KEY;

let nextId = 2;

const users = [
    {
        id: 1,
        email: "user@test.com",
        password: "AAbb123!",
        firstName: "Test",
        lastName: "Test",
        zip: 12345,
    },
];

export function loginUser(email, password) {

    return new Promise(async function(success, failure) {
        try {

            const userIndex = users.findIndex(function(user) {
                return user.email === email && user.password === password;
            });

            if(userIndex > -1)
            {
                const data = users[userIndex];
            
                success(data);
            }
            else {
                failure({error: "invalid email or password"});
            }
        
        }
        catch {
            failure({error: "User login failed"});
        }
    });

}

function findUserByEmail(email) {
    
    let result = null;
  
    const userIndex = users.findIndex(function(user) {
        return user.email === email;
    });

    if(userIndex > -1)
    {
        result = users[userIndex].id;
    }

    return result;
}

function setUserInfo(_id, email, password, firstName, lastName, zip) {

    const result = {
        id: _id,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        zip: zip,
    };
    
    return result;
}

export function createUser(email, password, firstName, lastName, zip) {
    
        return new Promise(async function(success, failure) {
            try {

               const exists = findUserByEmail(email);

                if(!exists)
                {
                    const newUser = setUserInfo(++nextId, email, password, firstName, lastName, zip);
                    users.push(newUser);

                    success(newUser);
                }
                else {
                    failure({error: "Account with this email already exists"});
                }
            
            }
            catch {
                failure({error: "User creation failed"});
            }
        });
}

export async function fetchProducts(params={}) {
   
    return new Promise(async function(success, failure) {
        try {

            const url = new URL("https://api.chec.io/v1/products");

            for(const key of Object.keys(params)) {
                url.searchParams.append(key, params[key]);
            }

            url.searchParams.append("limit", 10);

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {method: "GET", headers: headers});
            if(response.ok) {
    
                const json = await response.json();
    
                const products = json.data.map(function(product) {
                    return ({
                        id: product.id,
                        name: product.name,
                        description: product.description.replace('<p>','').replace('</p>', ''),
                        price: product.price.raw,
                        image: product.image.url,
                    });
                });

                const pagination = json.meta.pagination;

                const data = {
                    products: products,
                    pagination: pagination,
                }

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

export async function fetchCategories() {

    return new Promise(async function(success, failure) {
        try {

            const url = "https://api.chec.io/v1/categories";

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {method: "GET", headers: headers});
            if(response.ok) {
    
                const json = await response.json();
    
                const data = json.data.map(function(category) {
                    return ({
                        id: category.id,
                        name: category.name,
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

export async function createCart() {

    const url = new URL("https://api.chec.io/v1/carts");
    
    const result = await fetchGET(url);

    return result;
}

export async function getCart(id) {

    const url = new URL("https://api.chec.io/v1/carts");
    const params = {id: id};
   
    const result = await fetchGET(url, params);
    return result;
}

export async function addToCart(cartId, productID, productQuantity) {
    
    return new Promise(async function(success, failure) {
        try {

            const url = `https://api.chec.io/v1/carts/${cartId}`;

            const body = {
                id: productID,
                quantity: productQuantity,
            }

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "POST", 
                headers: headers,
                body: JSON.stringify(body),
            });
            
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "Failed to add to cart"});
            }
        
        }
        catch(error) {
            failure({error: "Failed to add to cart"});
        }
    });
}

export async function updateItemInCart(cartId, productID, productQuantity) {
    return new Promise(async function(success, failure) {
        try {

            const url = `https://api.chec.io/v1/carts/${cartId}/items/${productID}`;

            const body = {
                quantity: productQuantity,
            }

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "PUT", 
                headers: headers,
                body: JSON.stringify(body),
            });
            
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "Failed to update cart item"});
            }
        
        }
        catch(error) {
            failure({error: "Failed to update cart item"});
        }
    });
}

export async function removeItemFromCart(cartId, productID) {
    return new Promise(async function(success, failure) {
        try {

            const url = `https://api.chec.io/v1/carts/${cartId}/items/${productID}`;

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "DELETE", 
                headers: headers,
            });
            
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "failed to remove cart item"});
            }
        
        }
        catch(error) {
            failure({error: "failed to remove cart item"});
        }
    });
}

export async function applyDiscount(cartId, discount) {
    return new Promise(async function(success, failure) {
        try {

            const url = `https://api.chec.io/v1/carts/${cartId}`;

            const body = {
                discount_code: discount,
            }

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "PUT", 
                headers: headers,
                body: JSON.stringify(body),
            });
            
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "Invalid Discount Code"});
            }
        
        }
        catch {
            failure({error: "Failed to apply discount"});
        }
    });
}

export async function fetchCheckoutToken(cartId) {
 
    const url = new URL(`https://api.chec.io/v1/checkouts/${cartId}`);

    const params = {
        type: "cart",
    };
    
    const result = await fetchGET(url, params);

    return result;
}

export async function fetchCountries(checkoutToken) {

    const url = `https://api.chec.io/v1/services/locale/${checkoutToken}/countries`;
   
    const result = await fetchGET(url);
    return result;
}

export async function fetchRegions(checkoutToken, countryCode) {

    const url = `https://api.chec.io/v1/services/locale/${checkoutToken}/countries/${countryCode}/subdivisions`;
   
    const result = await fetchGET(url);
    return result;
}

export async function getShippingMethods(checkoutToken, countryCode, regionCode) {

    const url = `https://api.chec.io/v1/services/locale/${checkoutToken}/helper/shipping_options}`;
    const params = {
        country: countryCode,
        region: regionCode
    };
   
    const result = await fetchGET(url, params);
    return result;
}

export async function captureOrder(checkoutID, orderData) {
    return new Promise(async function(success, failure) {
        try {

            const url = `https://api.chec.io/v1/checkouts/${checkoutID}`;

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "POST", 
                headers: headers,
                body: JSON.stringify(orderData),
            });
            
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "Failed to process order"});
            }
        
        }
        catch(error) {
            failure({error: "Failed to process order"});
        }
    });
}


async function fetchGET(url, params=[]) {
    return new Promise(async function(success, failure) {
        try {

            for(const key of Object.keys(params)) {
                url.searchParams.append(key, params[key]);
            }

            const headers = {
                "X-Authorization": COMMERCE_API,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {method: "GET", headers: headers});
            if(response.ok) {
    
                const data = await response.json();
    
                success({response, data});
            }
            else {
                failure({error: "invalid http request"});
            }
        
        }
        catch(error) {
            failure({error: "invalid http request"});
        }
    });
}

