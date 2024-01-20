"use client"
import React from 'react'
import NavBar from '@/components/NavBar';
import { Carousel, Card, Timeline, Button, Footer } from "flowbite-react";
import Link from "next/link"
import HomeInfo from '@/components/home/HomeInfo';


const CardT = ({ url, text, href }: { url: string, text: string, href: string }) => {
  return (
    <Card style={{ backgroundColor: 'white' }} className='m-5 mt-0'>
      <div className="flex flex-col items-center mt-2">
        <img
          className="h-40 w-68 rounded shadow-md"
          src={`${url}`}
        />
        <div className="flex space mt-5">
          <Button color="gray" href={href}>
            {text}
          </Button>
        </div>
      </div>
    </Card>
  );
}

const HomePage = ({ }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar selectedTab='home' />
      <HomeInfo />
      <Footer container={true} className='rounded-none mt-0'>
        <Footer.Copyright
          href="#"
          by="ProvinceWatch"
          year={2023}
        />
        <Footer.LinkGroup>
          <Footer.Link href="https://github.com/ProvinceWatch">
            Github
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

export default HomePage;