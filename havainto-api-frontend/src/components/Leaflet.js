import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

export class Leaflet extends Component {
  render() {
    return (
      <Map center={[60.1699, 24.9384]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}
export default Leaflet;
