import AppLogo from "../custom/Logo";
import { Button } from "../ui/button";
import { CenteredMenu } from "./CenteredMenu";

import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <section className="px-3 py-6">
      <CenteredMenu
        logo={<AppLogo />}
        rightMenu={
          <>
            {/* TODO: Dark mode toggle button */}
            {/* <li data-fade>
              <LocaleSwitcher />
            </li> */}

            <li className="ml-1 mr-2.5" data-fade>
              <Button variant="ghost">Login</Button>
            </li>
            <li>
              <Button>Create Account</Button>
            </li>
          </>
        }
      >
        <li>
          <Link to="/sign-up">{"Courses"}</Link>
        </li>

        <li>
          <Link to="/sign-up">{"About"}</Link>
        </li>

        {/* <li>
          <Link to="/sign-up">{"Company"}</Link>
        </li>

        <li>
          <Link to="/sign-up">{"Career"}</Link>
        </li> */}
      </CenteredMenu>
    </section>
  );
};
