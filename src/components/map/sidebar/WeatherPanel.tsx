import { Sidebar } from "flowbite-react";
import { FC } from "react";
import { FiSun } from "react-icons/fi";
import WeatherCard from "../WeatherCard";
import { WeatherData } from "@/app/api/weather/types";

interface WeatherPanelProps {
  weatherData: Record<string, WeatherData>
}

const WeatherPanel: FC<WeatherPanelProps> = ({ weatherData}) => {
  return (
    <>
      <Sidebar.Items className='mt-5'>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FiSun}>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <span>Weather</span>
              </div>
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '50%' }} className='mb-2'>
        {Object.keys(weatherData).map((city: string, i) => (
          <WeatherCard city={city} temp={weatherData[city].main.temp} icon={weatherData[city].weather[0].icon} key={`w-${i}`} />
        ))}
      </div>
    </>
  )
};

export default WeatherPanel;