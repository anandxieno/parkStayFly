"use client";

import React from "react";
import { Map, APIProvider, Marker  } from "@vis.gl/react-google-maps";
import { mapLocationType } from "../types/home";

interface CustomMapProps {
  positions: mapLocationType;
}

const CustomMap = ({ positions }: CustomMapProps) => {
  if (!positions?.lat || !positions?.lng) return null;
  return (
    <div style={{ height: "600px", width: "100%", position : "relative" }}>
        <div id="fixedInfoBox" className="fixed-infobox">
            <div className="gm-box">

                <div className="gm-row">

                    <div className="gm-box-left">
                        <div className="gm-title">Courtyard by Marriott Toronto Airport</div>
                        <div className="gm-address">231 Carlingview Dr, Etobicoke, ON M9W 5E8, Canada</div>
                        <div className="gm-rating"><span className="hotel-rating">4 <span className="star full"></span><span className="star full"></span><span className="star full"></span><span className="star full"></span><span className="star empty"></span> 1,207 reviews</span></div>

                        <a className="gm-viewmap" target="_blank" href="https://www.google.com/maps/search/?api=1&amp;query=Courtyard%20by%20Marriott%20Toronto%20Airport">
                            View larger map
                        </a>
                    </div>

                    <div className="gm-box-right">
                        <a className="gm-dir" target="_blank" href="https://www.google.com/maps/dir//Courtyard+by+Marriott+Toronto+Airport,+231+Carlingview+Dr,+Etobicoke,+ON+M9W+5E8,+Canada/@43.6849467,-79.5968377,630m/data=!3m2!1e3!5s0x882b39908269d3c3:0xf389661c31b8be1e!4m19!1m10!3m9!1s0x882b399a92715295:0xf95e15028550367b!2sCourtyard+by+Marriott+Toronto+Airport!5m2!4m1!1i2!8m2!3d43.6849467!4d-79.5942628!16s%2Fg%2F1tftlvkm!4m7!1m0!1m5!1m1!1s0x882b399a92715295:0xf95e15028550367b!2m2!1d-79.5942628!2d43.6849467!5m1!1e1?entry=ttu&amp;g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D">
                            <span className="gm-dir-icon"></span>
                            Directions
                        </a>
                    </div>

                </div>

            </div>
        </div>
        <Map
          center={positions}
          zoom={1} mapTypeId="roadmap" >
          <Marker position={positions} />
        </Map>
    </div>
  );
};

export default CustomMap;