import React, { Component } from "react";
import axios from "axios";
import Leaflet from "../components/Leaflet";
import HForm from "../components/addHavaintoForm";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
//MaterialUI
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography"

import Havainto from "../components/Havainto";
class home extends Component {
  state = {
    havainnot: null
  };

  componentDidMount() {
    axios
      .get("https://europe-west1-havainto-api.cloudfunctions.net/api/havainnot")
      .then(res => {
        console.log(res.data);
        this.setState({
          havainnot: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentHavainnotMarkup = this.state.havainnot ? (
      this.state.havainnot.map(havainto => (
        <p>
        <button type = "button" size="lg" style={{width: "100%",height:"100%",flex:1}} active>
          <Havainto havainto={havainto} />
        </button>
        </p>
      ))
    ) : (
      <div id="data">
        <p>Loading..</p>
      </div>
    );


    
    return (
      <Grid container spacing={16}>
        <Leaflet></Leaflet>
        <Grid item sm={4} xs={6}>
        <Typography variant="body1">Viimeisimmät havainnot:</Typography> {recentHavainnotMarkup}
        </Grid>
        <Grid item sm={8} xs={6}><HForm classname="Hform"></HForm></Grid>
      
      </Grid>
    );
  }
}

export default home;
