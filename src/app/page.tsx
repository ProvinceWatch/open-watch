"use client"

import NavBar from '@/components/NavBar';
import Map from '@/components/Map';

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <NavBar />
      <Map lat={53.52904} lng={-113.48899} zoom={10} />
  </div>
  )
}
