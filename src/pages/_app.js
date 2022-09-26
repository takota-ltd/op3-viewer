import "styles/globals.css";
import NextNProgress from "nextjs-progressbar";

const App = ({ Component, pageProps }) => (
  <>
    <NextNProgress options={{ showSpinner: false }} />
    <Component {...pageProps} />
  </>
);

export default App;
