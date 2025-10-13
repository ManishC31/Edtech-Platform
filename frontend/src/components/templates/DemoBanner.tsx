import { Link } from "react-router-dom";
import { StickyBanner } from "./StickyBanner";

export const DemoBanner = () => (
  <StickyBanner>
    ❤️ Sale is Live - <Link to={"/register"}>Explore courses with offers</Link>
  </StickyBanner>
);
