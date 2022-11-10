
export function validateEmail(value) {
    let result = "Invalid email";
    const re =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(value.length && re.test(value)) {
        result = undefined;
    }
    return result;
}

export function validatePassword(value) {
    let result = "Invalid password";

    if(!(value.length >= 8 && value.length <= 20)) {
        return result;
    }

    if(!/[A-Z]+/.test(value)) {
        return result;
    }

    if(!/[a-z]+/.test(value)) {
        return result;
    }

    if(!/[0-9]+/.test(value)) {
        return result;
    }

    if(!/[-!@#$%^&*()_+]+/.test(value)) {
        return result;
    }

    result = undefined;
    return result;
}

export function validateCreditCard(cardNumber) {
    
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };

    for(const card in regexPattern) {
        if(cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
           if(cardNumber) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, "").trim())
                ? ""
                :"Enter a valid Card";
           }
        }
    }
    return "Enter a valid Card";
}

export function validateExpirationDate(year, month) {

    const yearNum = parseInt(year);
    const monthNum = parseInt(month) - 1;

    if(new Date(yearNum, monthNum).getTime() < new Date().getTime()) {
        return "Card Is Expired";
    }
}

export function validateSecurityCode(min, value) {
    return (value && value.length < min) 
    ? "Invalid Code"
    : undefined;
}

export function validatePhoneNumber(value) {
    return (value && value.length < 7) 
    ? "Invalid Phone"
    : undefined;
}