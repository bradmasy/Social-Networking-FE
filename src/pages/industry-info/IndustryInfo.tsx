


import { AnchorProps } from "../../components/anchor/Anchor";
import { Anchor, Header } from "../../components/index";
import cardImg from "../../assets/images/card-black.png";

import "./industry-info.scss";
import { object } from "square/dist/types/schema";


interface IndustryAttribute {
    access: string[];
    discounts: string[];
    bookings: string[];
    rewards: string[];
    
}

export const IndustryInfo: React.FC = () => {
    const anchorProps: AnchorProps = {
        href: "./industry-invite",
        link: "CLICK THIS LINK TO LEARN MORE AND APPLY"
    }

    const messageCopy = (
        <>
            <div>GET EXCLUSIVE ACCESS</div>
            <div>TO STUDIO BOOKINGS,</div>
            <div>PANELS, EVENTS & MORE</div>
        </>
    )

    const industryAttributes: IndustryAttribute[] = [
        {
            access: ["24/7 ACCESS TO THE BEACH HOUSE OR DUNDAS STUDIOS FOR THEIR VISION"],
            discounts: ["Lots"],
            bookings: ["Unlimited Bookings"],
            rewards: ["Access to all pop-ups and events for $0.00",
                "LAZER QUEST - 1 BOOKING per month",
                "CREATIVE THERAPY (coming soon)"
                ,"Featured Artist ZINE (x7 a year)"
            ]
        //     tab:["industry members can pay off a tab on their profile by connecting the square terminal to the SEVENS SOCIAL account",
        //      "if they sell products or tickets, they can add to their tab.",
        //      " Encourages usage and fair trade. Can add additional or pay it forward to other industry members."]
         }
    ]

    return (
        <>
            <Header />
            <main className="ss-industry-info">
                <section className="ss-industry-info__welcome">
                    <div className="ss-industry-info__welcome__card">
                        <img src={cardImg} alt="card"></img>
                    </div>
                    <div className="ss-industry-info__welcome__copy-container">
                        <p className="ss-industry-info__welcome__copy-container__copy">
                            {messageCopy}
                        </p>
                    </div>
                </section>
                <section className="ss-industry-info__perks">
                    <div className="ss-industry-info__industry__card">
                        <img src={cardImg} alt="card"></img>
                    </div>
                    <div className="ss-industry-info__perks__title">
                        <div>INDUSTRY MEMBERSHIP</div>
                        <div>$277/MONTH</div>
                    </div>
                    <div className="ss-industry-info__perks__attributes">
                        {industryAttributes.map((industryAttr, index) => (
                            Object.keys(industryAttr).map((key) => (
                                <div className="ss-industry-info__perks__attributes__attribute" key={key}>
                                    <div className="ss-industry-info__perks__attributes__attribute__container">
                                        <div className="ss-industry-info__perks__attributes__attribute__title">{key.toUpperCase()}</div>
                                        <div className="ss-industry-info__perks__attributes__attribute__content">
                                            {/* {industryAttr[key as keyof IndustryAttribute]} */}
                                            <ul>
                                                {industryAttr[key as keyof IndustryAttribute].map((attr, index) => (
                                                    <li>
                                                        {attr.toUpperCase()}
                                                    </li>

                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))}

                    </div>
                </section>
                <section className="ss-industry-info__apply">
                    <Anchor {...anchorProps} />
                </section>
            </main>
        </>
    )
}