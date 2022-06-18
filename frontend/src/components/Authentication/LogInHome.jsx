import { useState,useEffect } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import { AuthData } from "../../components/Authentication/Auth"
import Head from "next/head";
import NavBar from "../../components/items/Navbar"
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ToastContainer } from 'react-toastify';
import theme from "../../theme/theme";
import FullLayout from "../../layouts/FullLayout";
import Footer from "../../components/items/Footer";
import createEmotionCache from "../../createEmotionCache";
import 'react-toastify/dist/ReactToastify.css';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const LogInHome = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [open, setOpen] = useState(true)
  const {authToken,setAuthToken} = AuthData()
  
  useEffect(() => {
    setAuthToken(window.localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_LABEL), JSON.parse(window.localStorage.getItem(process.env.NEXT_PUBLIC_USER)))
    setTimeout(() => {setOpen(false)},1000)
    
  },[])

  return (
    <><Backdrop
      sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#fff' }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      {!open && <>
        {authToken ?
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Flexy NextJs Starter kit page</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <FullLayout>
                <Component {...pageProps} />
              </FullLayout>
            </ThemeProvider>
          </CacheProvider> :
          <>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </>
        }
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>}
    </>
  )
}

export default LogInHome