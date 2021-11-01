import React from "react";
import "./App.css";

import { createTheme } from "@material-ui/core/styles";    <- createThemeに変更
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Navbar from "./components/Navbar";
import ApiContextProvider from "./context/ApiContext";


const theme= createTheme({
  palette:{
    primary:indigo,
    secondary:{
      main: '#f44336'
    },
  },
  typography:{
    fontFamily:"cosmic neue"
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      </MuiThemeProvider>
  );
}

export default App;
