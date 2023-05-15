"use client"

import NavBar from '@/components/NavBar';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <NavBar />
      <Script strategy="afterInteractive" src="https://js.api.here.com/v3/3.1/mapsjs-core.js" />
      {/* <Script strategy="afterInteractive" src="https://js.api.here.com/v3/3.1/mapsjs-service.js" />
      <Script strategy="afterInteractive" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" />
      <Script strategy="afterInteractive" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" />
      <Script strategy="afterInteractive" src="https://js.api.here.com/v3/3.1/mapsjs-clustering.js" /> */}
    </>
  )
}
