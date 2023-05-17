"use client"
import NavBar from '@/components/NavBar';
import Map from '@/components/map/Map';

export default function MapPage() {
  return (
    <>
      <NavBar selectedTab='map'/>
      <Map zoom={7} />
    </>
  )
}