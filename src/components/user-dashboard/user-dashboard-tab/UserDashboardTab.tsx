import { Receipt } from "../../../pages/user-dashboard/UserDashboard";
import { SSPaymentForm, SSPaymentFormProps } from "../../form/payment-form/SSPaymentForm";

import "./user-dashboard-tab.scss"
export interface UserDashboardTabProps {

    membership: { [key: string]: string };
    receiptData: Receipt[];
    paymentFormProps: SSPaymentFormProps;
}

export const UserDashboardTab: React.FC<UserDashboardTabProps> = (props) => {
    const formatDate = (date: string) => {
        const dateString = date.split("T")[0]
        return dateString
    }

    return (
        <>
            <main className="ss-user-dashboard__tab">
                <div className="ss-user-dashboard__tab__container">
                    <div className="ss-user-dashboard__tab__container__column">
                        <div className="ss-user-dashboard__tab__container__column__tile">
                            <div className="ss-user-dashboard__tab__container__column__tile__container">
                                <div className="ss-user-dashboard__tab__container__column__tile__title">
                                    <p>CURRENT TAB
                                    </p>
                                </div>
                                <div className="ss-user-dashboard__tab__container__column__tile__content">
                                    {
                                        "$" + props.membership['balance']
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ss-user-dashboard__tab__container__column__tile">
                            <div className="ss-user-dashboard__tab__container__column__tile__container">
                                <div className="ss-user-dashboard__tab__container__column__tile__title">
                                    <p>LAST PAYMENT
                                    </p>
                                </div>
                                <div className="ss-user-dashboard__tab__container__column__tile__content-receipts">
                                    {
                                        <div className="ss-user-dashboard__receipt-tab">
                                            {
                                                props.receiptData.length > 0 ? (
                                                    <>
                                                        <div className="ss-user-dashboard__receipt-tab__date">
                                                            <div>
                                                                <label>
                                                                    DATE
                                                                </label>

                                                            </div>
                                                            {

                                                                formatDate(props.receiptData[0].createdAt)
                                                            }
                                                        </div>
                                                        <div className="ss-user-dashboard__receipt-tab__amount">
                                                            <div>
                                                                <label>AMOUNT</label>
                                                            </div>
                                                            <div>
                                                                {"$" + props.receiptData[0].amount}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>You have no payments yet</>
                                                )
                                            }

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ss-user-dashboard__tab__container__column-payment-form">
                        <div className="ss-user-dashboard__tab__container__column-title">
                            PAY TAB
                        </div>
                        <SSPaymentForm {...props.paymentFormProps} />
                    </div>
                </div>
            </main>
        </>
    )
}