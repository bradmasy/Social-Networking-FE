import "./loading-overlay.scss";

export const LoadingOverlay: React.FC = () => {
    const loadingText = "LOADING";

    return (
        <>
            <div className="ss-loading-backdrop">
                <div className="ss-loading-overlay-container">
                    <div className="ss-loading-overlay-container__loading" >
                        <p>{loadingText}</p>
                    </div>
                    <div className="ss-loading-overlay-container__spinner"></div>
                </div>
            </div>

        </>
    )
}