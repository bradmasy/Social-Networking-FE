import './nav-bar.scss';
import logoImg from '../../../src/assets/images/ss-logo.png';

export const NavBar: React.FC = () => {
    return (
        <>
            <div className="ss-header">
                <div className="ss-header-link-container ">
                    <div className="ss-header-link-container__links end">
                        <a href="/logout">LOGOUT</a>
                        <a href="/user-dashboard">DASHBOARD</a>
                    </div>
                </div>
                <div className="ss-header__logo-container">
                    <img src={logoImg} alt='sevens-social'></img>
                </div>
                <div className="ss-header-link-container start">
                    <div className="ss-header-link-container__links start">
                        <a href="/payment">PAYMENTS</a>
                        <a href="/locations">LOCATIONS</a>
                    </div>
                </div>
            </div>
        </>
    )
}