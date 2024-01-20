import { FC } from 'react';
import { DarkThemeToggle, Navbar } from "flowbite-react";
import Link from 'next/link';

interface NavBarProps {
  selectedTab: string
}

const NavBar: FC<NavBarProps> = ({ selectedTab }) => {
  return (
    <div className="shadow-md z-50">
      <Navbar fluid={true} className="sticky top-0 z-50" style={{ overflow: 'hidden' }}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            OpenWatchAB
          </span>
        </Navbar.Brand>
        <DarkThemeToggle className="ml-auto"/>
        <Navbar.Toggle />
        <Navbar.Collapse className='ml-4'>
          <Link href="/home-page" className={`${selectedTab == 'home' ? 'text-blue dark:text-white' : 'text-black dark: text-gray-400'}`}>
            Home
          </Link>
          <Link href="/map" className={`${selectedTab == 'map' ? 'text-blue dark:text-white' : 'text-black dark: text-gray-400'}`}>
            Map
          </Link>
          <Link href="/open-data" className={`${selectedTab == 'open-data' ? 'text-blue dark:text-white' : 'text-black dark: text-gray-400'}`}>
            Open Data
          </Link>
          <Link href="/cameras" className={`${selectedTab == 'cameras' ? 'text-blue dark:text-white' : 'text-black dark: text-gray-400'}`}>
            Traffic Cameras
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

NavBar.displayName = "NavBar";
export default NavBar;
