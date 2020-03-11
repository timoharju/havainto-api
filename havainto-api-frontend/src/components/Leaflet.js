import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import data from "./havaintoData";

export class Leaflet extends Component {
  render() {
    return (
      <Map center={[60.1699, 24.9384]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.city.map(city => {
          return (
            <CircleMarker
              center={[city["coordinates"][1], city["coordinates"][0]]}
              radius={20 * Math.log(city["population"] / 10000000)}
              fillOpacity={0.5}
              stroke={false}
            >
              <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>
                  {city["name"] +
                    ": " +
                    "Population" +
                    " " +
                    city["population"]}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </Map>
    );
  }
}
export default Leaflet;
