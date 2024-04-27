import './about.scss';
import { Header } from '../../components';

export const About: React.FC = () => {

    const mainCopy = (
        <>
            <span>GET EXCLUSIVE ACCESS<br/></span>
            <span>TO STUDIO BOOKINGS<br/></span>
            <span>PANELS, EVENTS<br/></span>
            <span>& MORE.</span>
        </>
    );
    return (
        <>
            <Header />
            <section className="ss-about__main-content">
                <main className='ss-about__main-content__main'>
                   
                </main>
            </section>
        </>
    )
}