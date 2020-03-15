import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import data from "./havaintoData";
import axios from "axios";

//Testi
import HForm from "../components/addHavaintoForm";
import home from "../pages/home";

//import update from 'react-addons-update'; // ES6
//var update = require('react-addons-update'); // ES5 with npm


 class tiedot extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const XXcoord=Leaflet.state.coordXY
    const YYcoord=60
    return (
      XXcoord
    );
  }
}

export class Leaflet extends Component {
  state = {
    havainnot: [],
    markers:[],
    coordXY:23
  }; 

  componentWillMount (){


    //Get coordinates to map
    axios
    .get("https://europe-west1-havainto-api.cloudfunctions.net/api/havainnot")
    .then(res => {
        console.log(res.data.length+'täää');
        var text = "";
            var informationList=[];

            //Iterate res.data
            for (var i = 0; i < res.data.length; i++) {
                //json object[i] of response           
                var response = res.data[i];

                //Make object
                var objkt = { 'name': JSON.stringify(response.missa), 'coordinates': [response.koordinaattiX, response.koordinaattiY],'lisatiedot':response.lisatiedot, 'population': 15000 };

                //push object to list
                informationList.push(objkt);
            }
            this.setState({
              havainnot: informationList
            });
        
    })
    .catch(err => console.log(err));    
  }

  addMarker = (e) => {
    const {havainnot} = this.state
    const markkerit=[]
    //markers.push(e.latlng)

    // add coordinates to list
    markkerit[0]=e.latlng;

    //print clicked coordinates
    console.log(e.latlng);
    this.setState({markers: markkerit})

    //print items on coordinate list
    //console.log(this.state.havainnot[1].lisatiedot)

    // add temporary marker on clicked spot
    this.state.havainnot[this.state.havainnot.length-1]={ 'name': 'empty', 'coordinates': [e.latlng.lng, e.latlng.lat],'lisatiedot':'empty', 'population': 15000 }
    this.forceUpdate()

    //new havainnot
    const uusiHavainto=[...this.state.havainnot];
    //HForm.uusiHavainto()
    
    //const tiedot=[...HForm.state]

  }

  render() {
    return (
      
      <Map center={[60.1699, 24.9384]} zoom={12} onClick={this.addMarker}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          
        />
        {this.state.havainnot.map(havainnot => {
          return (
            <CircleMarker
              center={[havainnot["coordinates"][1], havainnot["coordinates"][0]]}
              radius={20 * Math.log(havainnot["population"] / 10000)}
              fillOpacity={0.8}
              stroke={false}
              color= {"#FF0800"}
            >
              <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>
                  {havainnot["name"] +
                    ": " +
                    "\nLisatiedot: " +
                    " " +
                    havainnot["lisatiedot"]}
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
