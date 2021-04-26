import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([])

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

  return (
    <div className="app">
      <div className="app_header">
        <h2>COVID-19 TRACKER</h2>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
