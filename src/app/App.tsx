import { BrowserRouter, useLocation } from "react-router-dom";
import { ApiServiceProvider } from '../contexts/ApiServiceContext';
import { Routes } from './Routes';
import './App.scss';
import { MobileMenu } from "../components/menus/mobile-menu/MobileMenu";
import { MobileNavBar } from "../components/Mobile-Navbar/MobileNavBar";
import { useState, useEffect } from "react";

function MainContent() {
  const [mobileState, setMobileState] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      url: "/logout",
      caption: "LOGOUT"
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
    },
  ];

  const pathsWithoutNavBar = ['/', '/about', '/login', '/application',];

  const shouldRenderNavBar = !pathsWithoutNavBar.includes(location.pathname);

  return (
    <>
      {shouldRenderNavBar && (
        <MobileNavBar mobileState={mobileState} setMobileState={setMobileState} />
      )}
      {mobileState && (
        <MobileMenu menuItems={menuItems} />
      )}
      <Routes />
    </>
  );
}


function App() {
  return (
    <div className="App">
      <ApiServiceProvider>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </ApiServiceProvider>
    </div>
  );
}


export default App;