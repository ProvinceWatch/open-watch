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
            <p style={{ color: 'black' }}>
              OpenWatch
            </p>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link href="/map" style={{ color: selectedTab === 'map' ? 'blue' : 'black' }}>
            Map
          </Link>
          <Link href="/cameras" style={{ color: selectedTab === 'cameras' ? 'blue' : 'black' }}>
            Traffic Cameras
          </Link>
          <Link href="/cameras" style={{ color: selectedTab === 'open-data' ? 'blue' : 'black' }}>
            Open Data
          </Link>
          <Link href="/parks" style={{ color: selectedTab === 'parks' ? 'blue' : 'black' }}>
            Parks
          </Link>
        </Navbar.Collapse>
      </Navbar>

    </div>
  )
}

NavBar.displayName = "NavBar";
export default NavBar;
