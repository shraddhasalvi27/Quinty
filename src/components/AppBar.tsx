import { FC } from "react";
import { LuMenu } from "react-icons/lu";
import NetworkSwitcher from "./NetworkSwitcher";

export const AppBar: FC = (props) => {
  const menu = [
    { name: "Home", link: "#home" },
    { name: "Tools", link: "#tools" },
    { name: "Features", link: "#features" },
    { name: "Price", link: "#price" },
    { name: "Home", link: "#home" },
  ];

  return (
    <div>
      <header id="navbar-sticky" className="navbar">
        <div className="container">
          <nav className="flex items-center">
            <a href="/" className="logo">
              <img src="assets/images/logo1.png" className="h-10" alt="logo" />
            </a>
            <div className="px-2.5 lg:hidden">
              <button
                className="hs-collapse-toggle bg-default-100/5 inline-flex h-9 w-12 items-center justify-center rounded-md border border-white/20 "
                type="button"
                data-hs-collapse="#mobileMenu"
                data-hs-type="collapse"
              >
                <LuMenu className="stroke-white" />

              </button>
            </div>
            
            <div
              className="hs-collapse mx-auto mt-2 sm:hidden grow basis-full items-center justify-center transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto"
              id="mobileMenu"
            >
              <ul id="navbar-navlist" className="navbar-nav">
                {menu.map((list, index) => (
                  <li className="nav-item" key={index}>
                    <a className="nav-link" href={list.link}>
                      {list.name}
                    </a>
                  </li>
                ))}
              </ul>
              
            </div>
            <NetworkSwitcher/>
            
          </nav>
        </div>
      </header>
    </div>
  );
};
