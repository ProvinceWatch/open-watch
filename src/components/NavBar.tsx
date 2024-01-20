import { FC } from 'react';
import { Navbar } from "flowbite-react";
import Link from 'next/link';


interface NavBarProps {
  selectedTab: string
}

const NavBar: FC<NavBarProps> = ({ selectedTab }) => {
  return (
    <div>
      <Navbar fluid={true} className="sticky top-0 z-50" style={{ overflow: 'hidden' }}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              OpenWatchAB
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Link href="/home-page" style={{ color: selectedTab === 'home' ? '#0070c4' : 'black' }}>
            Home
          </Link>
          <Link href="/map" style={{ color: selectedTab === 'map' ? '#0070c4' : 'black' }}>
            Map
          </Link>
          <Link href="/open-data" style={{ color: selectedTab === 'open-data' ? '#0070c4' : 'black' }}>
            Open Data
          </Link>
          <Link href="/cameras" style={{ color: selectedTab === 'cameras' ? '#0070c4' : 'black' }}>
            Traffic Cameras
          </Link>
        </Navbar.Collapse>
      </Navbar>

    </div>
  )
}

NavBar.displayName = "NavBar";
export default NavBar;
