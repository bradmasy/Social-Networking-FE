import './about.scss';
import { Header } from '../../components';

export const About: React.FC = () => {

    const mainCopy = (
        <>
            <span>A COLLABORATIVE<br /></span>
            <span>HUB FOR INDUSTRY<br /></span>
            <span>LEADING CREATIVES<br /></span>
            <a href="/apply" className="highlight">CLICK HERE TO LEARN MORE & APPLY</a>
        </>
    );
    return (
        <>
            <Header />
            <section className="ss-about__main-content">
                <main className='ss-about__main-content__main'>
                    {mainCopy}
                </main>
            </section>
        </>
    )
}