"use client"
import React from 'react'
import NavBar from '@/components/NavBar';
import { Carousel, Card, Timeline, Button, Footer } from "flowbite-react";

const HomePage = ({ }) => {


  const CardT = ({ url, text, href }: { url: string, text: string, href: string }) => {
    return (
      <Card style={{ backgroundColor: 'white' }} className='m-5 mt-0'>
        <div className="flex flex-col items-center mt-2">
          <img
            className="h-40 w-68 rounded shadow-md"
            src={`${url}`}
            alt="Bonnie image"
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

  return (
    <>
      <NavBar selectedTab='home' />
      <div className="min-h-screen bg-white">

        <div className="flex flex-col justify-center" style={{ marginBottom: '0' }}>
          <Card className='m-5'>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Open Data For Albertans
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Welcome to OpenWatchAB, your essential open data portal for Albertans. We provide real-time road conditions, live traffic cameras, weather updates, and emergency alerts, ensuring your safety and convenience. Further, we provide access to search for government documents, reinforcing our commitment to transparency. With OpenWatchAB, we equip you with reliable, up-to-the-minute information, fostering informed communities throughout Alberta. Explore our site today.
            </p>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Features
            </h5>
            <div>
              <Timeline>
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Body>
                      Map for interacting with traffic cameras, viewing road conditions, weather, and more.
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Body>
                      Open Data portal to search for government documents such as census, financial, and judicial data.
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Body>
                      Traffic Camera Dashboard to monitor grouped cameras in Edmonton, Calgary, Banff, and All Alberta Highways
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </div>
          </Card>
        </div>


        <div className="flex flex-row justify-center flex-wrap center" style={{ overflowX: 'scroll' }}>
          <CardT url="/mapex.png" text="Go To Map View" href="/map" />
          <CardT url="/data.png" text="Go To Open Data Portal" href="/open-data" />
          <CardT url="/cameras.png" text="Go To Camera Dashboard" href="/cameras" />
        </div>
      </div>

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
    </>
  );
}

export default HomePage;