export interface RoadConditionsData {
  Id:                     number;
  LocationDescription:    string;
  "Primary Condition":    PrimaryCondition;
  "Secondary Conditions": SecondaryCondition[];
  Visibility:             Visibility | null;
  AreaName:               string;
  RoadwayName:            string;
  EncodedPolyline:        string;
  LastUpdated:            number;
}

export enum PrimaryCondition {
  BareDry = "Bare Dry",
  BareWet = "Bare Wet",
  Closed = "Closed",
  CvdIce = "Cvd Ice",
  CvdSnw = "Cvd Snw",
  NoReport = "No Report",
  PtlyCvdIce = "Ptly Cvd Ice",
  PtlyCvdSnw = "Ptly Cvd Snw",
}

export enum SecondaryCondition {
  BareWheelPaths = "Bare Wheel Paths",
  BlackIce = "Black Ice",
  BlowingSnow = "Blowing Snow",
  DriftingSnow = "Drifting Snow",
  Dust = "Dust",
  FogPatches = "Fog Patches           ",
  IcySections = "Icy Sections",
  IcyWheelPaths = "Icy Wheel Paths",
  PackedSnowAndIce = "Packed Snow And Ice",
  ShoulderIceSnow = "Shoulder Ice/Snow",
  Slippery = "Slippery",
  Slush = "Slush",
  Smoke = "Smoke",
  Snowing = "Snowing",
  StrongWind = "Strong Wind",
}

export enum Visibility {
  Fair = "Fair",
  Good = "Good",
  Poor = "Poor",
}
