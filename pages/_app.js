import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import '../styles/customs.css';
import '../styles/apartment.css';
import "../styles/fonts.css"
import '../styles/RangeSlider.css';
import "../styles/confirm.css"

export const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  // const router = useRouter();

  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState(null);

  const values = { wishlist, setWishlist, wishlistData, setWishlistData };

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.push('/login'); 
  //   }
  // }, [router.pathname]);

  return (
    <Context.Provider value={values}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
