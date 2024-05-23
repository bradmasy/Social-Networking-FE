import { BrowserRouter } from "react-router-dom";
import { ApiServiceProvider } from '../contexts/ApiServiceContext';
import { Routes } from './Routes';
import './App.scss';
import { MobileMenu } from "../components/menus/mobile-menu/MobileMenu";
import { MobileNavBar } from "../components/Mobile-Navbar/MobileNavBar";
import { useState } from "react";

function App() {
  const [mobileState, setMobileState] = useState(false);

  const menuItems = [
    {
      url: "/login",
      caption: "LOGIN"
    },
    {
      url: "/logout",
      caption: "LOGOUT"
    },
    {
      url: "/",
      caption: "HOME"
    },
    {
      url: "/user-dashboard",
      caption: "DASHBOARD"
    },
    {
      url: "/payment",
      caption: "PAYMENTS"
    },
    {
      url: "/locations",
      caption: "LOCATIONS"
    }
  ]
  return (
    <div className="App">
      <ApiServiceProvider>
        <BrowserRouter>
          <MobileNavBar mobileState={mobileState} setMobileState={setMobileState} />
          {mobileState && (
            <MobileMenu menuItems={menuItems} />
          )}
          <Routes />
        </BrowserRouter>
      </ApiServiceProvider>
    </div>
  );
}

export default App;
