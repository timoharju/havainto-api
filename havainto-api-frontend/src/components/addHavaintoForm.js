import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//MaterialUI
import Grid from "@material-ui/core/Grid";
import widthStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    textAlign: "center",
    margin: "20px 20px 20x"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    margin: "10px auto 10px auto"
  }
};
export class addHavaintoForm extends Component {
  constructor() {
    super();
    this.state = {
      havainto: "",
      lisatiedot: "",
      missa: "",
      koordinaattiX: "",
      koordinaattiY: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const havaintoData = {
      havainto: this.state.havainto,
      lisatiedot: this.state.lisatiedot,
      missa: this.state.missa,
      koordinaattiX: this.state.koordinaattiX,
      koordinaattiY: this.state.koordinaattiY
    };
    axios
      .post(
        "https://europe-west1-havainto-api.cloudfunctions.net/api/havainnot",
        havaintoData
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item sm>
          <Typography variant="body1">Lisää havainto:</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="havainto"
              name="havainto"
              type="havainto"
              label="Havainto"
              value={this.state.havainto}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="lisatiedot"
              name="lisatiedot"
              type="lisatiedot"
              label="Lisatieto"
              value={this.state.lisatiedot}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="missa"
              name="missa"
              type="missa"
              label="Missä"
              value={this.state.missa}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="koordinaattiX"
              name="koordinaattiX"
              type="koordinaattiX"
              label="KoordinaattiX"
              value={this.state.koordinaattiX}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="koordinaattiY"
              name="koordinaattiY"
              type="koordinaattiY"
              label="KoordinaattiY"
              value={this.state.koordinaattiY}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="buttonF"
            >
              Lähetä
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
addHavaintoForm.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default addHavaintoForm;
