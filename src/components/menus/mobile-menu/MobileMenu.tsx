import { useEffect, useRef } from 'react';
import './mobile-menu.scss'

interface MenuItem {
    url: string;
    caption: string;
}

interface MobileMenuProps {
    menuItems: MenuItem[];
}



export const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
    const menuOverlay = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const adjustOverlayPosition = () => {
            const overlay = document.querySelector('.ss-mobile-menu') as HTMLElement;
            if (overlay) {
                const scrollY = window.scrollY || window.pageYOffset;
                const viewportHeight = window.innerHeight;
                const overlayHeight = overlay.offsetHeight;
                const topPosition = Math.max((viewportHeight - overlayHeight) / 2 + overlayHeight / 2 + scrollY);
                overlay.style.top = topPosition + 'px';
            }
        }

        window.addEventListener('resize', adjustOverlayPosition);
        window.addEventListener('scroll', adjustOverlayPosition);

        adjustOverlayPosition();

        const overlay = document.querySelector('.ss-mobile-menu') as HTMLElement;

        if (overlay) {
            overlay.style.visibility = 'visible';
        }

        return () => {
            window.removeEventListener('resize', adjustOverlayPosition);
            window.removeEventListener('scroll', adjustOverlayPosition);
        };
    }, []);

    return <>
        <div className="ss-mobile-menu" ref={menuOverlay}>
            <div className="ss-mobile-menu__menu-item-container"> {menuItems.map((menuItem, index) => (
                <a href={menuItem.url} className="ss-mobile-menu__menu-option" key={`${menuItem}-${index}`} >
                    {menuItem.caption}
                </a>
            ))}</div>

        </div>
    </>
}