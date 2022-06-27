import { useQuery } from "@apollo/client";
import { useGlobalContext } from "../context";
import { CURRENCIES } from "../graphQl/queries";
import { useEffect } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Currency = () => {
  const { data, loading } = useQuery(CURRENCIES);
  const {
    currencies,
    setCurrencies,
    handelChangeCurrency,
    selectedCurrency,
    setSelectedCurrencySymbol,
  } = useGlobalContext();
  useEffect(() => {
    if (!loading) {
      setCurrencies(data.currencies);
    }
  }, [data]);

  //Getting Selected Currency Symbol
  useEffect(() => {
    if (data) {
      setSelectedCurrencySymbol(
        currencies.filter((currency) => currency.label == selectedCurrency)[0]
          .symbol
      );
    }
  }, [selectedCurrency]);

  return (
    <FormControl
      variant="standard"
      sx={{ s: 1, minWidth: 100, height: "100%" }}
    >
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCurrency}
        onChange={(e) => handelChangeCurrency(e.target.value)}
      >
        {currencies.map((currency) => {
          const { label, symbol } = currency;
          return (
            <MenuItem key={label} value={label}>
              {`${symbol} `}
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Currency;
