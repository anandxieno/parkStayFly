export interface SanityImageRef {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface homeDataType {
  topbanner: string;

  parkYourCar: {
    mainImage: SanityImageRef & {
      caption: string;
    };
    threeImages: SanityImageRef[];
  };

  airportParking: {
    subHeading: string;
    heading: string;
    description: any[]; // Portable Text blocks
  };

  accommodations: {
     accommodationName : string;
     accommodationImage : SanityImageRef;
     accommodationDescription : any[]; // Portable Text blocks
  };
}


export interface globalDataType {
  siteTitle: string;
  headerLogo?: string;
  footerLogo?: string;
  favicon: SanityImageRef;
  copyrightText: string;
} 