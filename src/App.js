import "./styles/globals.css";

//INTRNAL IMPORT
import {
  NavBar,
  Footer,
  FrontSection,
  BigNFTSilder,
} from "./components/componentsindex";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MarketplaceExplore } from "./maketplace/marketplaceIndex";
import { Explore } from "./collection/collectionIndex";
import { Provider } from "./context/Context";
import ComingSoon from "./components/ComingSoon/ComingSoon"

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplaceExplore />} />
          <Route path="/collection" element={<Explore />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}
export default MyApp;
