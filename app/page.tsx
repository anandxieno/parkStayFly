'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import client from './client';
import Link from 'next/link';
import { globalDataType } from './types/home';

export default function Home() {
  const [globalData, setGlobalData] = useState<globalDataType>();
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hotealLocationMap, setHotelLocationMap] = useState<number>(0);
  const [faqsOpenIndex, setFaqsOpenIndex] = useState<number | null>(null);

  const GlobalData_Query = ` *[_type == "global"][0]{
                             siteTitle,
                             "headerLogo": headerLogo.asset->url,
                             "footerLogo": footerLogo.asset->url,
                             "favicon": favicon.asset->url, 
                             "copyrightText" : copyrightText
                             }`;

  const HOME_QUERY = `
                         *[_type == "HomePage"][0]{
                           topbanner,
                         
                           parkYourCar{
                             "mainImage": mainImage.asset->url,
                             "threeImages": threeImages[].asset->url
                           },
                         
                           airportParking{
                             heading,
                             subHeading,
                             "description": description[0].children[0].text
                           },
                         
                           accommodationsSection{
                             sectionHeading,
                             "items": Accommodation[]{
                               _key,
                               "name": accommodationName,
                               "description": accommodationDescription[0].children[0].text,
                               "image": accommodationImage.asset->url,
                               "accommodationRatesLink" : accommodationRatesLink,
                               "amenities": amenities[]{
                                 "amenityName": amenityName,
                                 "amenityIcon": amenityIcon.asset->url
                               }
                              }
                            },
                            hotelLocationMap{
                               sectionHeading,
                               "locations": hotelLocations[]{
                                 "hotelName": hotelName,
                                 "hotelMapCode": hotelMapCode
                                }
                            },
                            FaqSection{
                                sectionHeading,
                                "sectionDescription": sectionDescription,
                                "faqs": faqs[]{
                                  "faqTitle": faqtitle,
                                  "faqContent": faqContent
                                }
                            }
                        }
                      `;


  const fetchGlobalData = async () => {
    const data = await client.fetch(GlobalData_Query);
    return data;
  };

  const fetchHomeData = async () => {
    const data = await client.fetch(HOME_QUERY);
    return data;
  };


  useEffect(() => {
    fetchGlobalData().then(setGlobalData).catch((err) => console.error(err));

    fetchHomeData()
      .then(setHomeData)
      .finally(() => {
        setLoading(false);
      });

  }, []);

  useEffect(() => {
    console.log(homeData);
  }, [homeData]);

  useEffect(() => {
    console.log(globalData);
  }, [globalData]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!homeData) return null;

  const {
    topbanner,
    parkYourCar,
    airportParking,
    accommodationsSection,
  } = homeData;



  return (
    <>
      {/* Site Header */}
      {
        globalData && (
          <header className="bg-white py-5">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                {
                  globalData.headerLogo && (
                    <Link href="/">
                      <Image
                        src={globalData.headerLogo}
                        alt="Header Logo"
                        width={365}
                        height={40}
                      />
                    </Link>
                  )
                }

              </div>
              <nav className="hidden md:flex space-x-6">
                <Link href="#Airport-Hotel-and-Parking-Packages" className="text-[#231f20] text-[13px] uppercase font-semibold hover:text-[#b99d75] transition-all duration-300">AIRPORT HOTEL & PARKING PACKAGES</Link>
                <Link href="#location" className="text-[#231f20] text-[13px] uppercase font-semibold hover:text-[#b99d75] transition-all duration-300">LOCATIONS</Link>
                <Link href="#faq" className="text-[#231f20] text-[13px] uppercase font-semibold hover:text-[#b99d75] transition-all duration-300">FAQ</Link>
              </nav>
            </div>
          </header>
        )}

      {/* Top Banner */}
      <section className="w-full py-3 bg-light-blue text-center text-white">
        <div className="container">
          <h1 className="text-[50px] font-semibold">{topbanner}</h1>
        </div>
      </section>

      {/* Park Your Car */}
      <section className="bg-dark-blue pt-[50px] pb-[305px]">
        <div className="container">
          <Image
            src={parkYourCar.mainImage}
            alt="Park Your Car"
            width={918}
            height={0}
            className="w-full mx-auto"
          />
        </div>
      </section>

      <div className="container -mt-[230px] grid grid-cols-3 gap-5">
        {parkYourCar.threeImages.map((img: string, i: number) => (
          <Image key={i} src={img} alt="" width={420} height={460} />
        ))}
      </div>

      {/* Airport Parking */}
      <section className="container mt-[100px] mb-[140px] text-center">
        <span className="inline-block text-[32px] border-y-2 border-green px-2">
          {airportParking.subHeading}
        </span>
        <h2 className="text-[50px] my-6">{airportParking.heading}</h2>
        <p className="text-lg max-w-3xl mx-auto">
          {airportParking.description}
        </p>
      </section>

      {/* Accommodations */}
      <section className="container mb-[140px]" id="Airport-Hotel-and-Parking-Packages">
        <h2 className="text-[42px] mb-12">
          {accommodationsSection.sectionHeading}
        </h2>

        <div className="grid grid-cols-3 gap-20">
          {accommodationsSection.items.map((item: any) => (
            <div key={item._key}>
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={268}
              />
              <h3 className="font-bold my-3">{item.name}</h3>

              {
                item.amenities && (
                  <div className="animities">
                    {
                      item.amenities.map((amenity: any, index: number) => (
                        <div key={index} className='flex items-center mb-2'>
                          <Image
                            src={amenity.amenityIcon}
                            alt={'Amenities Icon'}
                            width={20}
                            height={0}
                          />
                          <span className="ml-2">{amenity.amenityName}</span>
                        </div>
                      ))
                    }

                  </div>
                )
              }

              <p>{item.description}</p>
              <Link href={item.accommodationRatesLink} className="inline-block mt-2 text-dark-blue uppercase font-semibold text-lg">
                View Rates &gt;</Link>
            </div>
          ))}
        </div>
      </section>

      {/* View your hotel location section */}


      {
        homeData.hotelLocationMap && (
          <section className="mt-[140px]" id="location">
            <div className="container">

              {homeData.hotelLocationMap.sectionHeading && (
                <h2 className="text-[42px] mb-12">
                  {homeData.hotelLocationMap.sectionHeading}
                </h2>
              )}

              {/* Hotel location name list */}
              {
                homeData.hotelLocationMap.locations && (
                  <div className="hotel-locations mb-8">
                    <ul className='flex items-center gap-10'>
                      {
                        homeData.hotelLocationMap.locations.map((location: any, index: number) => (
                          <li key={index} className="mb-2 font-semibold text-lg cursor-pointer" onClick={() => setHotelLocationMap(index)}>
                            {location.hotelName}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
            </div>
            {/* Hotel location map codes */}
            {
              homeData.hotelLocationMap.locations && (
                <div className="hotel-maps">
                  {
                    homeData.hotelLocationMap.locations.map((location: any, index: number) => (
                      <div key={index} className={hotealLocationMap === index ? "block" : "hidden"}> <div dangerouslySetInnerHTML={{ __html: location.hotelMapCode }} /></div>
                    ))
                  }
                </div>
              )
            }
          </section>
        )
      }

      {/* Faq section */}
      {
        homeData.FaqSection && (
          <section className='pt-[125px] pb-[100px]' id='faq'>
            <div className="container">
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-3 pr-16">
                  {
                    homeData.FaqSection.sectionHeading && (
                      <h2 className="text-[42px] mb-5 font-medium leading-14">{homeData.FaqSection.sectionHeading}</h2>
                    )}
                  {
                    homeData.FaqSection.sectionDescription && (
                      <p>{homeData.FaqSection.sectionDescription}</p>
                    )
                  }
                </div>
                <div className="col-span-9">
                  {
                    homeData.FaqSection.faqs && (
                      <div className="faqs mt-5">
                        {
                          homeData.FaqSection.faqs.map((faq: any, index: number) => (
                            <div key={index} className={"bg-[#F9F9F9] py-4 px-5 " + (index > 0 ? "mt-3" : "")}>
                              <h3 className="text-xl cursor-pointer flex items-start gap-5 justify-between" onClick={() => setFaqsOpenIndex(index)}>
                                {faq.faqTitle}
                                {
                                  faqsOpenIndex === index ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className='size-5' viewBox="0 0 256 256" role="img" aria-hidden="true"> <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" fill="none" fillRule="nonzero" opacity={1}><path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" fill="rgb(29,29,27)" stroke="none" strokeWidth={1} strokeLinecap="round" strokeLinejoin="miter" strokeMiterlimit={10} /><path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" fill="rgb(29,29,27)" stroke="none" strokeWidth={1} strokeLinecap="round" strokeLinejoin="miter" strokeMiterlimit={10} /></g></svg>
                                  ) : (
                                    <svg className='w-4 mt-2' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.688 490.688"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M490.688,197.12H293.568V0h-96v197.12H0v96h197.568V490.688h96V293.12H490.688V197.12z"></path> </g> </g></svg>
                                  )
                                }
                              </h3>
                              <div className={"transition-all duration-300 " + (faqsOpenIndex === index ? "h-auto visible opacity-100 pt-4" : "h-0 invisible opacity-0")}>
                                <p>{faq.faqContent}</p>
                              </div>

                            </div>
                          ))
                        }
                      </div>
                    )

                  }
                </div>
              </div>
            </div>

          </section>
        )
      }

      {/* Site Footer */}
      {
        globalData && (
          <footer className="bg-dark-blue py-[30px]">
            <div className="container mx-auto px-4 flex items-center justify-between">
              {
                globalData.footerLogo && (
                  <div>
                    <Image
                      src={globalData.footerLogo}
                      alt="Footer Logo"
                      width={360}
                      height={40}
                    />
                  </div>
                )
              }

              <div className="text-white text-sm font-medium">
                &copy; {new Date().getFullYear()} {globalData.copyrightText}
              </div>
            </div>
          </footer>
        )
      }
    </>
  );
}
