import React, { Component } from "react";
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";
//Material UI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex"
  }
};

export class Havainto extends Component {
  render() {
      dayjs.extend(relativeTime)
    const {
      classes,
      havainto: {
        havainto,
        missa,
        lisatiedot,
        createdAt,
        havaintoID,
        koordinaattiX,
        koordinaattiy
      }
    } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">{missa}</Typography>
          <Typography variant="body1">{lisatiedot}</Typography>
          <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Havainto;
