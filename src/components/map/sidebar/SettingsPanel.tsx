import { Sidebar, ToggleSwitch } from "flowbite-react";
import { FC } from "react";
import {FiSettings} from "react-icons/fi";

interface SettingsPanelProps {
  showAlerts: boolean,
  setshowAlerts: (checked: boolean) => void,
  showRoadConditions: boolean,
  setShowRoadConditions: (checked: boolean) => void,
  showCameras: boolean,
  setShowCameras: (checked: boolean) => void,
  showConstruction: boolean,
  setShowConstruction: (checked: boolean) => void,
  showPOIs: boolean,
  setShowPOIs: (checked: boolean) => void,
}

const SettingsPanel: FC<SettingsPanelProps> = ({ 
  showAlerts, setshowAlerts, showRoadConditions, setShowRoadConditions, showCameras, 
  setShowCameras, showConstruction, setShowConstruction, showPOIs,setShowPOIs 
}) => {
  return (
    <>
      <Sidebar.Items className='mt-5'>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FiSettings}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Map Settings</span>
              </div>
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '40%' }} className='ml-10 mt-2'>
        {/* <ToggleSwitch checked={showAlerts} label="Alerts" onChange={setshowAlerts} /> */}
        <ToggleSwitch checked={showRoadConditions} label="Road Conditions" onChange={setShowRoadConditions} className='mt-3' />
        <ToggleSwitch checked={showCameras} label="Cameras" onChange={setShowCameras} className='mt-3' />
        {/* <ToggleSwitch checked={showConstruction} label="Construction Sites" onChange={setShowConstruction} className='mt-3' /> */}
        {/* <ToggleSwitch checked={showPOIs} label="Points of Interest" onChange={setShowPOIs} className='mt-3' /> */}
      </div>
    </>
  );
};

export default SettingsPanel;