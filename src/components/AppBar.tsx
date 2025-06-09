import { FC } from "react"
import LuMenu from "next/link";
import NetworkSwitcher from "./NetworkSwitcher";

export const AppBar: FC = (props)=>{
  const menu =[
    {name:"Home",
      link:'#home'
    },
    {name:"Tools",
      link:'#tools'
    },
    {name:"Features",
      link:'#features'
    },
    {name:"Price",
      link:'#price'
    },
    {name:"Home",
      link:'#home'
    }
  ]

  return(
    <div>
      <header id="navbar-sticky" className="navbar">
        <div className="container">
          <nav>
            <a href="/" className="logo">
              <img src= "assets/images/logo1.png"
                   className="h-10" alt="logo"
              />
            </a>
          </nav>
        </div>
      </header>
    </div>
  )
}
