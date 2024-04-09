import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from "react-hot-toast";
import PullToRefresh from "../hooks/PulltoRefresh"

import "../styles/fonts.css"
import '../styles/RangeSlider.css';
import "../styles/confirm.css"
import React from "react";
import "../styles/globals.css";
import '../styles/customs.css';
import '../styles/apartment.css';
import LoginLogic from "./login/LoginLogic";
import NotLogin from "./login/NotLogin";

export const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const[auth,setAuth]=useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState(null);
  const values = { openLogin, setOpenLogin, wishlist, setWishlist, wishlistData, setWishlistData, auth, setAuth };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.push('/login'); 
  //   }
  // }, [router.pathname]);

  return (
    <>
    <PullToRefresh>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Context.Provider value={values}>
         <div className="page-transition-container">
        <Component {...pageProps} key={router.route}/>
         </div>
         <Toaster
          toastOptions={{
            position: 'top-right',
            className: '',
            style: {
              'font-size': '14px',
            },
          }}
        />
        <NotLogin openLogin={openLogin} />
      </Context.Provider>
      </PullToRefresh>
    </>
  );
}

export default MyApp;
