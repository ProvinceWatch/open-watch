"use client"

import NavBar from '@/components/NavBar';
import Map from '@/components/map/Map';

export default function Home() {
  return (
    <>
      <NavBar selectedTab='map' />
      <Map zoom={7} />
    </>
  )
}
