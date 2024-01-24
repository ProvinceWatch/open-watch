import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TextInput, ListGroup, Toast, Button, Sidebar, Card } from "flowbite-react";
import { FiAlertCircle, FiSun } from "react-icons/fi";
import { TbRoad, TbTrafficLights, TbCamera, TbTemperatureCelsius } from "react-icons/tb";
import WeatherAlert from "@/components/map/WeatherAlert";
import { SideBar } from '@/components/SideBar';

interface MapSideBarProps {
}

interface Alert {
  Message: string,
  Notes: string,
  StartTime: number
}

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [moreAlerts, setMoreAlerts] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getWeatherAlerts();
    getWeatherWarnings();
    getWeatherData();
  }, []);

  const getWeatherAlerts = async () => {
    await fetch('/map/emergency-alerts', {
      headers: {
        'Cache-Control': 'max-age=0'
      },
    })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data;
        const alerts = alertsResp.map((alert: Alert, i: Number) => {
          return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText='' />
        });
        setWeatherAlerts(alerts.reverse());
      });
  };

  const getWeatherData = async () => {
    await fetch('/api/weather',  {
      headers: {
        'Cache-Control': 'max-age=0'
      },
    }).then(async (res) => {
      const json = await res.json();
      const resp = json.data;
      setWeatherData(resp);
    });
  }

  const getWeatherWarnings = async () => {
    await fetch('/map/weather-alerts', { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data.features;
        const alerts: any[] = [];

        alertsResp.forEach((alert: any, i: Number) => {
          if (alert.properties.prov !== "AB") { return null; }
          alerts.push(<WeatherAlert infoStr={alert.properties.alerts[0].text} title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={alert.properties.alerts[0].issueTimeText} />);
        });

        setMoreAlerts(alerts.reverse());
      });
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example" className="w-full">
      <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={FiAlertCircle}
              label={moreAlerts.length + weatherAlerts.length}
            >
              Alerts
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '40%' }}>
          {weatherAlerts}
          {moreAlerts}
        </div>
        <Sidebar.Items className='mt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={FiSun}
            >
              Weather
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        {
          Object.keys(weatherData).map((city: string, index: number) => {
            // Check if the current index is even (to group pairs of cards)
            return (
              <div key={index} className={`mb-4 flex`}>
                {/* First card in the row */}
                <div className={`w-full`}>
                  <Card className="p-0 m-0 h-20">
                    <div className="flex items-center justify-between">
                      <div className='w-3/4'>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          {city}
                        </h5>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          {((weatherData as any)[city] as any)['main'].temp} °C
                        </h5>
                      </div>
                      {/* Weather icon */}
                      <div className='w-1/4'>
                        <img src={`https://openweathermap.org/img/wn/${(weatherData as any)[city].weather[0].icon}@2x.png`} />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })
        }
     
      </Sidebar>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;