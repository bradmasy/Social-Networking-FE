import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { Button } from "../../components/index";
import "./home.scss";


export const Home: React.FC = () => {
    const navigate = useNavigate();

    const message = (
        <>
            <span>WELCOME TO <br /><span className="highlight title-text">SEVENS SOCIAL</span><br /><br /></span>
            <span>IF YOU ARE A MEMBER, PLEASE USE THE <span className="highlight">LOGIN</span> BUTTON TO LOGIN<br /></span>
            <span>IF YOU ARE INTERESTED IN BECOMING A MEMBER<br /></span>
            <span>PLEASE CLICK <span className="highlight">APPLY</span><br /></span>

        </>
    )

    const relocate = (url: string) => {
        navigate(url);
    }
    return (
        <>
            <Header />
            <section className="ss-home-container">
                <main className="ss-home-container__main">
                    <p>
                        {message}
                    </p>
                </main>
                <div className="ss-home-container__buttons">
                    <Button text="APPLY" type="button" click={() => {
                        relocate("/apply");
                    }} />
                    <Button text="LOGIN" type="button" click={() => {
                        relocate("/login");
                    }} />
                </div>
            </section>
        </>
    )
}