"use client"
import NavBar from '@/components/NavBar';
import Map from '@/components/map/Map';

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar selectedTab='map' />
      <Map zoom={7} />
    </div>
  )
}