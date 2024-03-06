export interface ConstructionData {
  ID:                  string;
  Organization:        Organization;
  RoadwayName:         string;
  DirectionOfTravel:   DirectionOfTravel;
  Description:         string;
  Reported:            number;
  LastUpdated:         number;
  StartDate:           number;
  PlannedEndDate:      number | null;
  LanesAffected:       LanesAffected;
  Latitude:            number;
  Longitude:           number;
  LatitudeSecondary:   number;
  LongitudeSecondary:  number;
  EventType:           EventType;
  IsFullClosure:       boolean;
  Restrictions:        Restrictions;
  DetourPolyline:      null;
  DetourInstructions:  null;
  Recurrence:          string;
  RecurrenceSchedules: RecurrenceSchedule[] | string;
  EventSubType:        string;
  EncodedPolyline:     string;
  Details:             string;
}

export enum DirectionOfTravel {
  AllDirections = "All Directions",
  BothDirections = "Both Directions",
  Eastbound = "Eastbound",
  Northbound = "Northbound",
  Southbound = "Southbound",
  Unknown = "Unknown",
  Westbound = "Westbound",
}

export enum EventType {
  AccidentsAndIncidents = "accidentsAndIncidents",
  Closures = "closures",
  GeneralInfo = "generalInfo",
  RestrictionClass = "restrictionClass",
  Roadwork = "roadwork",
  SpecialEvents = "specialEvents",
}

export enum LanesAffected {
  AllLanesClosed = "All Lanes Closed",
  NoData = "No Data",
}

export enum Organization {
  Ers = "ERS",
}

export interface RecurrenceSchedule {
  StartDate:  string;
  EndDate:    null | string;
  Times:      Time[];
  DaysOfWeek: DaysOfWeek[];
}

export enum DaysOfWeek {
  Friday = "Friday",
  Monday = "Monday",
  Saturday = "Saturday",
  Sunday = "Sunday",
  Thursday = "Thursday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
}

export interface Time {
  StartTime: StartTime;
  EndTime:   EndTime;
}

export enum EndTime {
  The135959070000 = "13:59:59-07:00:00",
  The155959060000 = "15:59:59-06:00:00",
  The165959070000 = "16:59:59-07:00:00",
  The185959070000 = "18:59:59-07:00:00",
  The235959060000 = "23:59:59-06:00:00",
  The235959070000 = "23:59:59-07:00:00",
}

export enum StartTime {
  The000000060000 = "00:00:00-06:00:00",
  The000000070000 = "00:00:00-07:00:00",
  The050000070000 = "05:00:00-07:00:00",
  The070000070000 = "07:00:00-07:00:00",
  The080000060000 = "08:00:00-06:00:00",
  The080000070000 = "08:00:00-07:00:00",
}

export interface Restrictions {
  Width:  number | null;
  Height: number | null;
  Length: null;
  Weight: number | null;
  Speed:  number | null;
}
