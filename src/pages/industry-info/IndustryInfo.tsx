


import { AnchorProps } from "../../components/anchor/Anchor";
import { Anchor, Header } from "../../components/index";
import cardImg from "../../assets/images/card-black.png";

import "./industry-info.scss";


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
            access: ["24/7 access to THE BEACH HOUSE and DUNDAS STUDIOS for your creative vision.", "Custom BLACK INDUSTRY CARD (coming soon)", "Access to all panels, workshops, and events for $0.00."],
            discounts: ["TAB OPTION: industry members can pay off monthly by donation instead of the full cost if they need.",
                "1 MAIN EVENT, weekly panel and workshop opportunity’s. To book main additional events, discounted pricing.", "C2C NON FOR PROFIT: access to grant applications each quarter for each industry. (coming soon)"],
            bookings: ["full priority access to bookings on calendar for events, workshops & panels.", "Gear rentals, resources, workstations and more. (coming soon)"],
            rewards: ["COFFEE TAB: show your membership for free coffee & drinks at exclusive partner locations (coming soon)", "Featured Artist ZINE (coming soon)"

                , "Featured Artist ZINE (x7 a year)", "Show your membership and get instant discounts to studio bookings, products, and events with our exclusive creative partners and products. (coming soon)"
            ]
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