import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Countries from "../../Countries/Countries";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    flexGrow: 1,
    backgroundColor: "white"
  },
  media: {
    width: "100px",
    height: "auto",
    paddingLeft: "20px"
  },
  tc: {
    textAlign: "center"
  },
  margin: {
    marginTop: "50px",
    marginBottom: "25px"
  }
});

const getCountryName = countryCode => {
  const name = countryCode.toUpperCase();
  if (Countries.hasOwnProperty(name)) {
    return Countries[name];
  } else {
    return countryCode;
  }
};


const WeatherCard = ({city,country,description,icon,windSpeed,temp,humidity,foreCast}) => {
  
  const classes = useStyles();
  const arrayDays = foreCast.map((day, i) => {
    return (
      <Grid className={`${classes.tc}`} key={i} item xs={2}>
        <Typography component="p">{day.date}</Typography>
        <br/>
        <Typography component="p">{day.maxTemp}f</Typography>
         <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="icon"/>
        <Typography component="p">{day.minTemp}f</Typography>
      </Grid>
    );
  });

  return (
    <Card raised justify="space-evenly" className={classes.card}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CardHeader title={`${city},${country}`} />
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <h4>
              {description}{" "}
              <span>
                 Wind {windSpeed}m/h <span>Huminity {humidity}</span>
              </span>
            </h4>
          </CardContent>
        </Grid>
        <Grid item xs={6} sm={6}>
          <CardMedia
            component="img"
            className={classes.media}
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            title="Icon"
          />
        </Grid>
        <Grid className={classes.tc} item xs={6} sm={6}>
          <h2>{temp}f</h2>
        </Grid>
        <Grid className={classes.margin} item xs={12}>
          <Grid justify="space-around" container spacing={0}>
            {arrayDays}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WeatherCard;
