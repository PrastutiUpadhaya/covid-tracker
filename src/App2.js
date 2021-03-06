import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';
// import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData, prettyPrintStat } from './util'
import "leaflet/dist/leaflet.css"
import LocalityCheck from "./LocalityCheck.js"

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('worldwide');
  const [ countryInfo, setCountryInfo ] = useState('');
  const [ tableData, setTableData ] = useState([]);
  const [ mapCenter, setMapCenter ] = 
  useState({ lat: 28.6139, lng: 77.2090 });
  const [ mapZoom, setMapZoom ] = useState(3);
  const [ mapCountries, setMapCountries ] = useState([]);
  const [ casesType, setCasesType ] = useState("cases");

  useEffect(() => {
    fetch ("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));

        const sortedData = sortData(data);
        setTableData(sortedData); 
        setCountries(countries);
        setMapCountries(data);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = 
      countryCode === 'worldwide' 
        ? 'https://disease.sh/v3/covid-19/all' 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter(countryCode === 'worldwide' ? [0, 0] : [data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  };

 const history = useHistory();
 const handleClick = () => history.push('/LocalityCheck');
  

  return (
    <div className="app">

      <div className="app__left">

        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* <button className="app__button" onClick={(e) => render(<HelloFriend />, document.getElementById('root'))}> */}
          <button className="app__button" onClick={handleClick}>
            Check For Your Locality
          </button>

          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox 
            isBlue
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases" 
            total={prettyPrintStat(countryInfo.cases)} 
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          <InfoBox 
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered" 
            total={prettyPrintStat(countryInfo.recovered)} 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
          />
          <InfoBox 
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths" 
            total={prettyPrintStat(countryInfo.deaths)} 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
          />
        </div>

        <Map 
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
        
      </Card>

    </div>
  );
}

export default App;
