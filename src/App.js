import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

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
          setCountries(countries);
        })
    }
    getCountriesData();
  }, [])

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
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
        <InfoBox title="CoronaVirus cases" total={2000} cases={123} />
        <InfoBox title="CoronaVirus cases" total={2000} cases={123} />
        <InfoBox title="CoronaVirus cases" total={2000} cases={123} />

      </div>

    </div>
  );
}

export default App;
