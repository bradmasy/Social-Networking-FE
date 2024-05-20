import './nav-bar.scss';
import logoImg from '../../../src/assets/images/ss-logo.png';

export const NavBar: React.FC = () => {
    return (
        <>
            <div className="ss-header">
                <div className="ss-header-link-container end">
                    <div className="ss-header-link-container__links">
                        <a href="./login">LOGIN</a>
                        <a href="./">HOME</a>
                    </div>
                </div>
                <div className="ss-header__logo-container">
                    <img src={logoImg} alt='sevens-social'></img>
                </div>
                <div className="ss-header-link-container start">
                    <div className="ss-header-link-container__links">
                        <a href="./">DASHBOARD</a>
                        <a href="/payment">PAYMENTS</a>
                    </div>
                </div>
            </div>
        </>
    )
}