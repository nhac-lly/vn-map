declare module '@svg-country-maps/vietnam' {
  interface Location {
    name: string;
    id: string;
    path: string;
  }

  interface VietnamMapData {
    label: string;
    viewBox: string;
    locations: Location[];
  }

  const vietnamMapData: VietnamMapData;
  export default vietnamMapData;
} 