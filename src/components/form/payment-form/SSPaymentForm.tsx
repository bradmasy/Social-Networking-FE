
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import "./ss-payment-form.scss";
import { useLayoutEffect, useState } from "react";
import { useApiService } from "../../../contexts/ApiServiceContext";

export interface SSPaymentFormProps {
    appId: string;
    locationId: string;
    loaded: boolean;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: JSX.Element;
    errorDisplay: boolean;
    setErrorDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    // type: "TAB" | "MONTH";
}

export const SSPaymentForm: React.FC<SSPaymentFormProps> = (props) => {

    const apiService = useApiService();

    const [amount, setAmount] = useState("");
    const [enableButton, setEnableButton] = useState(false);
    const [display, setDisplay] = useState(false);
    const [cardName, setCardName] = useState("");

    const processAmount = (): string => {
        const conversionFactor = 100; // square payments values accept cents, amount:100 === $1
        const parsedAmount = amount.charAt(0) === '$' ? amount.slice(1,) : amount;
        const totalAmountInCents = parsedAmount.includes('.') ? parseInt(parsedAmount.slice(0, parsedAmount.indexOf('.'))) * conversionFactor + parseInt(parsedAmount.slice(parsedAmount.indexOf('.') + 1,)) : parseInt(parsedAmount) * conversionFactor;
        return totalAmountInCents.toString();
    }

    const updateAmount = (e: string) => {
        setAmount(e);
    }

    const updateName = (e:string)=> {
        setCardName(e);
    }

    return (
        <>
            <div className="ss-payment-form-container">
                <div className="ss-payment-form-container__title">
                    MAKE A PAYMENT ON YOUR TAB TODAY
                </div>
                <div className="ss-payment-form-container__amount">
                    <label>NAME ON CARD</label>
                    <input name="name" type="text" value={cardName} onChange={(e) => updateName(e.target.value)}></input>
                </div>
                <div className="ss-payment-form-container__amount">
                    <label>AMOUNT</label>
                    <input name="amount" type="number" value={amount} onChange={(e) => updateAmount(e.target.value)}></input>
                </div>
                <PaymentForm
                    applicationId={props.appId}

                    cardTokenizeResponseReceived={async (token: any, buyer: any) => {


                        props.setLoaded(true)

                        const totalMoneyConverted = processAmount();

                        const body = {
                            token: token["token"],
                            amount: totalMoneyConverted,
                            name: cardName
                            // type:props.type
                        }

                        console.log(body)
                        // disable the button while the transaction is occuring...
                        setEnableButton(true);

                        apiService.make_payment(body)
                            .then((response) => {
                                console.log(response)
                                setDisplay(true);
                            })
                            .catch((error) => {
                                console.log(error);
                                props.setErrorDisplay(error);
                            })
                            .finally(() => {
                                setEnableButton(false);
                            })



                    }}


                    locationId={props.locationId}

                >
                    <CreditCard
                        buttonProps={{
                            css: {
                                backgroundColor: "#50B2CA",
                                fontSize: "14px",
                                color: "#fff",
                                transition: "0.5s ease-in-out",
                                "&:hover": {
                                    scale: '1.05'

                                },
                            },
                            isLoading: enableButton
                        }}
                    />
                </PaymentForm>
            </div>
        </>
    )
}