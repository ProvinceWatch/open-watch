export type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

export const BOUNDARIES = {
  'calgary-cameras': { latMin: 50.8345, latMax: 51.19477, lonMin: -114.2705, lonMax: -113.79533 },
  'edmonton-cameras': { latMin: 53.39612, latMax: 53.66752, lonMin: -113.7123, lonMax: -113.2454 },
  'banff-cameras': { latMin: 51.0279, latMax: 51.5040, lonMin: -116.3205, lonMax: -115.10374 },
  'alberta-highways': { latMin: 49, latMax: 60, lonMin: -120, lonMax: -110 },
};
