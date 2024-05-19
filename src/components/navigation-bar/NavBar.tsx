import './nav-bar.scss';
import logoImg from '../../../src/assets/images/ss-logo.png';

export const NavBar: React.FC = () => {
    return (
        <>
            <div className="ss-header">
                <div className="ss-header__text"><p>
                    SEVENS
                </p></div>
                <div className="ss-header__logo-container">
                    <img src={logoImg} alt='sevens-social'></img>
                </div>
                <div className="ss-header__text">
                    <p>
                        SOCIAL
                    </p>
                </div>
            </div>
        </>
    )
}