import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./components/Auth.tsx";
import Home from "./components/Home.tsx";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" Component={Auth} />
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}