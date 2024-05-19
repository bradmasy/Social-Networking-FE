import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { Button } from "../../components/index";
import spinningLogo from "../../assets/video/ss-spinning-logo.mp4";
import ReactPlayer from "react-player";


import "./home.scss";


export const Home: React.FC = () => {
    const navigate = useNavigate();

    const message = (
        <>
            <span className="highlight title-text">WELCOME TO SEVENS SOCIAL</span>
            {/* <span>IF YOU ARE A MEMBER, PLEASE USE THE <span className="highlight">LOGIN</span> BUTTON TO LOGIN<br /></span>
            <span>IF YOU ARE INTERESTED IN BECOMING A MEMBER<br /></span>
            <span>PLEASE CLICK <span className="highlight">APPLY</span><br /></span> */}

        </>
    )

    const relocate = (url: string) => {
        navigate(url);
    }
    return (
        <>
            {/* <Header /> */}
            <section className="ss-home-container">
                  <main className="ss-home-container__main">
                    <p>
                        {message}
                    </p>
                </main>
                <div className="ss-home_container__animation-container">
                <video autoPlay loop muted className="ss-home-container__animation">
                    <source src={spinningLogo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
             
                {/* <ReactPlayer
                    url={require("../../assets/video/ss-spinning-logo.mp4")}
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={true}
                    loop={true}
                    muted={true}
                    volume={0}
                    className='react-player'
                    /> */}

              
               { <div className="ss-home-container__buttons">
                    <Button text="APPLY" type="button" click={() => {
                        relocate("/apply");
                    }} />
                    <Button text="LOGIN" type="button" click={() => {
                        relocate("/login");
                    }} />
                </div> }
            </section>


        </>
    )
}