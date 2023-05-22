"use client"

import { useState } from 'react';
import { ListGroup } from 'flowbite-react';
import { BiExpandAlt} from 'react-icons/bi';

const RoadConditionsLegend = ({ }: {}) => {
  const [showLegend, setShowLegend] = useState(true);

  const handleShow = () => {
    setShowLegend(!showLegend);
  }

  const conditions = ['Bare Dry', 'Closed', 'Wet', 'Bare Wet', 'Snow Covered', 'Ice Covered', 'Travel Not Recommended', 'No Report'];
  const colors = ['green', 'red', 'blue', 'blue', '#ADD8E6', 'aqua', 'orange', 'black'];

  return (
    <div id="road-conditions-legend" className="text-sm" style={{ zIndex: 1, position: 'absolute', right: 10, top: '60px' }}>
      <ListGroup>
        <ListGroup.Item key="road-conditions-dropdown" className='text-center' onClick={handleShow}>
          <div className='flex flex-row'>
            <div>
              Road Conditions
            </div>
            <div style={{color: 'transparent'}}>
              _____________
            </div>
            <div>
              <BiExpandAlt size={18}/>
            </div>
          </div>
        </ListGroup.Item>
        {showLegend &&
          conditions.map((condition, index) => {
            return (
              <ListGroup.Item disabled key={condition}>
                <span id='legend' style={{ backgroundColor: `${colors[index]}`, width: '30px', height: '5px', display: 'inline-block', marginRight: '5px', marginTop: '7.5px' }}></span> <span style={{ color: "black" }}>{condition}</span>
              </ListGroup.Item>);
          })
        }
      </ListGroup>
    </div>
  );
}

export default RoadConditionsLegend;