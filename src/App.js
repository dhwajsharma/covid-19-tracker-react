import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import LineGraph from './components/LineGraph/LineGraph';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData } from './util';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ))

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })

  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h2>COVID-19 TRACKER</h2>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="CoronaVirus cases" total={countryInfo.todayCases} cases={countryInfo.cases} />
          <InfoBox title="CoronaVirus cases" total={countryInfo.todayRecovered} cases={countryInfo.recovered} />
          <InfoBox title="CoronaVirus cases" total={countryInfo.todayDeaths} cases={countryInfo.deaths} />
        </div>

        <Map />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
