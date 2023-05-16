"use client"
import { Navbar } from "flowbite-react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Map from '@/components/Map';
import Cameras from '@/components/Cameras';

export default function NavBar() {
  const [selectedTab, setSelectedTab] = useState("map");
 const map = <Map lat={53.52904} lng={-113.48899} zoom={7} />;
  return (
    <Router>
      <div>
        <Navbar fluid={true} className="sticky top-0 z-50">
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              <p style={{ color: 'black' }}>
                ProvinceWatch
              </p>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Link to="/map"  style={{ color: selectedTab === 'map' ? 'blue'  : 'black' }}>
             <div onClick={() => {setSelectedTab("map")}}> Map </div>
            </Link>
            <Link to="/cameras" onClick={() => setSelectedTab("cameras")} style={{ color: 'black' }}>
              Traffic Cameras
            </Link>
            <Link to="/cameras" onClick={() => setSelectedTab("cameras")} style={{ color: 'black' }}>
              Open Data Portal
            </Link>
            <Link to="/parks" onClick={() => setSelectedTab("parks")} style={{ color: 'black' }}>
              Parks
            </Link>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/parks" element={<h1>Home</h1>} />
          <Route path="/map" element={map} />
          <Route path="/" element={map} />
        </Routes>

      </div>
    </Router>
  )
}
