import VISA_ICON from "../assets/cards/visa.png";
import AMERICAN_EXPRESS_ICON from "../assets/cards/amex.png";
import MASTER_CARD_ICON from "../assets/cards/masterCard.png";
import DISCOVER_ICON from "../assets/cards/discover.png";

export const APP_PAGE = {
    PAGE_HOME: "h",
    PAGE_LOGIN: "l",
    PAGE_CREATE: "c",
    PAGE_CART: "i",
    PAGE_SHIPPING: "s",
    PAGE_PAYMENT: "p",
    PAGE_CONFIRMATION: "f",
}

export const INPUT_LOGIN = {
    LOGIN_EMAIL: "email",
    LOGIN_PASSWORD: "password",
    LOGIN_CONFIRM: "confirm",
    LOGIN_FIRST_NAME: "firstName",
    LOGIN_LAST_NAME: "lastName",
    LOGIN_ZIP: "zip",
};

export const INPUT_SHIPPING = {
    SHIPPING_TITLE: "title",
    SHIPPING_NAME: "name",
    SHIPPING_ADDRESS: "address",
    SHIPPING_ZIP: "zip",
    SHIPPING_COUNTRY: "country",
    SHIPPING_CITY: "city",
    SHIPPING_STATE: "state",
    SHIPPING_PHONE: "phone",
};

export const INPUT_PAYMENT = {
    PAYMENT_CARDHOLDER: "cardHolder",
    PAYMENT_NUMBER: "cardNumber",
    PAYMENT_EXPIRE_M: "expire_m",
    PAYMENT_EXPIRE_Y: "expire_y",
    PAYMENT_CVV: "cvv"
};


export const CARD = [
    "VISA",
    "MASTER_CARD",
    "AMERICAN_EXPRESS",
    "DISCOVER"
];

export const CARD_ICON= {
    VISA: VISA_ICON,
    MASTER_CARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
    DISCOVER: DISCOVER_ICON
};