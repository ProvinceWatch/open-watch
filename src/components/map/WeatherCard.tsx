import { Card } from "flowbite-react";

interface WeatherCardProps {
  temp: number,
  city: String,
  icon: String
}

const WeatherCard = (props: WeatherCardProps) => {
  return (
    <div className={`mb-4 flex`}>
      <div className={`w-full`}>
        <Card className="p-0 m-0 h-20">
          <div className="flex items-center justify-between">
            <div className='w-3/4'>
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {props.city}
              </h5>
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {Math.round(props.temp)} °C
              </h5>
            </div>
            <div className='w-1/4'>
              <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
};

export default WeatherCard;