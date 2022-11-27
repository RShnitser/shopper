import React from "react";
import InfoForm from "./InfoForm";
import Button from "../Button/Button";

const PageConfirmation = () => {

    const handleOnSubmit = () => {

    }

    const onHandleBack = () => {

    }

    const buttonNext = <Button 
        text="CHECKOUT"
        onClick={handleOnSubmit}
    />

    const buttonBack = <Button 
        text="HOME"
        onClick={onHandleBack}
    />

    const result = <InfoForm progress={2} buttonBack={buttonBack} buttonNext={buttonNext}>

         <h2 className="bold">Confirmation</h2>

    </InfoForm>;

    return result;
}

export default PageConfirmation;