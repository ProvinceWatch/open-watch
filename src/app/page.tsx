"use client"

import Script from 'next/script';

import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-clustering.js" />
    </>
  )
}
