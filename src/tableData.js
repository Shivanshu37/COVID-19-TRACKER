import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Loader from "react-loader-spinner";
import StateTable from "./stateData.js";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./tableData.css";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./util";
function Table() {
  const [Confirmed, setConfirmed] = useState([]);
  const [Recovered, setRecovered] = useState([]);
  const [Deaths, setDeaths] = useState([]);
  const [NewCases, setNew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setMapCountries(data);
          console.log(data);
        });
    };

    getCountriesData();
  }, []);
  axios({
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "741a96821cmsh25cf77c6d7bf1afp12ad1ejsn1a19639b177e",
      useQueryString: true,
    },
    params: {
      country: "India",
    },
  })
    .then((response) => {
      const { active, recovered, total } = response.data.response[0].cases;
      setNew(response.data.response[0].cases.new);
      setConfirmed(total);

      setRecovered(recovered);
      setDeaths(response.data.response[0].deaths.total);

      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  if (isLoading === true) {
    return (
      <Loader type="BallTriangle" color="cadetblue" height={80} width={80} />
    );
  } else {
    return (
      <div className="app">
        <div className="app__left">
          <div className="app__stats">
            <Card className="Cards">
              <p style={{ color: "#ff073a" }}>Confirmed</p>
              <h3 style={{ color: "red" }}>{prettyPrintStat(NewCases)}</h3>

              <Typography className="infoBox__total" color="textSecondary">
                {prettyPrintStat(Confirmed)} Total
              </Typography>
            </Card>

            <Card className="Cards">
              <p style={{ color: "green" }}>Recovered</p>
              <Typography className="infoBox__total" color="textSecondary">
                {prettyPrintStat(Recovered)}
              </Typography>
            </Card>
            <Card className="Cards">
              <p style={{ color: "#6c757d" }}>Deceased</p>
              <Typography className="infoBox__total" color="textSecondary">
                {prettyPrintStat(Deaths)}
              </Typography>
            </Card>
          </div>
          <div className="map__div">
            <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          </div>
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <StateTable className="stateTablePosition" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Table;
