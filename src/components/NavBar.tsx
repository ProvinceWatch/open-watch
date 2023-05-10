import { Navbar } from "flowbite-react";

export default function NavBar() {
  return (
    <Navbar fluid={true} rounded={true} >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <p style={{ color: 'black' }}>
            ProvinceWatch
          </p>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/map" active={true}>
          Map
        </Navbar.Link>
        <Navbar.Link href="/cameras">
          Traffic Cameras
        </Navbar.Link>
        <Navbar.Link href="/parks">
          Parks
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
