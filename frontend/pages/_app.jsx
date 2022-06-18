import * as React from "react";
import PropTypes from "prop-types";
import { Auth } from "../src/components/Authentication/Auth"
import '../styles/globals.css'
import LogInHome from "../src/components/Authentication/LogInHome";


export default function MyApp(props) {
  return (
    <Auth>
       <LogInHome {...props} />
    </Auth>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
