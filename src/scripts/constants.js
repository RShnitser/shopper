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