export interface CanadaWeatherAlerts {
  type:     string;
  uuid:     string;
  features: Feature[];
}

export interface Feature {
  type:       FeatureType;
  properties: Properties;
  geometry:   Geometry;
}

export interface Geometry {
  type:        GeometryType;
  coordinates: Array<Array<Array<number[]>>>;
}

export enum GeometryType {
  MultiPolygon = "MultiPolygon",
}

export interface Properties {
  index:  string;
  name:   string;
  prov:   Prov;
  alerts: Alert[];
}

export interface Alert {
  index:           string;
  alertName:       string;
  alertNameShort:  string;
  alertBannerText: string;
  alertHeaderText: string;
  alertCode:       string;
  zoneName:        string;
  prov:            Prov;
  locId:           string;
  feaId:           string;
  wxoCode:         string;
  parentCode:      string;
  parentName:      string;
  type:            AlertType;
  program:         Program;
  status:          Status;
  issueTime:       Date;
  timezone:        IssuingOfficeTz;
  issueTimeText:   string;
  issuingOfficeTZ: IssuingOfficeTz;
  id:              string;
  expiry:          Date;
  zones:           string[];
  text:            string;
  special_text:    SpecialText[];
  publicZone?:     string;
}

export enum IssuingOfficeTz {
  Cst = "CST",
  Est = "EST",
  Mst = "MST",
  Pst = "PST",
}

export enum Program {
  Highway = "highway",
  Public = "public",
}

export enum Prov {
  Ab = "AB",
  Bc = "BC",
  BcYt = "BC/YT",
  MB = "MB",
  Nu = "NU",
  On = "ON",
  Qc = "QC",
}

export interface SpecialText {
  type:   SpecialTextType;
  link:   string;
  alias?: Alias;
}

export enum Alias {
  BCStorm = "#BCStorm ",
}

export enum SpecialTextType {
  Email = "email",
  Hashtag = "hashtag",
}

export enum Status {
  Continued = "continued",
  Issued = "issued",
}

export enum AlertType {
  Advisory = "advisory",
  Statement = "statement",
  Warning = "warning",
}

export enum FeatureType {
  Feature = "Feature",
}
