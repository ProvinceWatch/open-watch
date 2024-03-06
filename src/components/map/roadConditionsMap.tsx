import { RoadConditionsData } from "@/app/api/road-conditions/types";

export const getColourForRoadCondition = (roadCondition: RoadConditionsData) => {
  let color;
  switch (roadCondition['Primary Condition']) {
    case 'Bare Dry':
      color = 'green';
      break;
    case 'Closed':
      color = 'red';
    case 'Bare Wet':
      color = '#8791E5';
      break;
    case 'Ptly Cvd Snw':
      color = '#ADD8E6';
      break;
    case 'Cvd Snw':
      color = '#ADD8E6';
      break;
    case "Ptly Cvd Ice":
      color = '#FFC000';
      break;
    case "Cvd Ice":
      color = '#FFC000';
      break;
    case 'No Report':
      color = 'black';
      break;
    default:
      color = 'black';
  }
}