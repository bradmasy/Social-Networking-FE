import "./anchor.scss";
export interface AnchorProps {
    href: string;
    link: string;
}

export const Anchor: React.FC<AnchorProps> = (anchorProps) => {
    return (
        <>
            <a className="ss-anchor" href={anchorProps.href}>
                {anchorProps.link}
            </a>
        </>
    )
}