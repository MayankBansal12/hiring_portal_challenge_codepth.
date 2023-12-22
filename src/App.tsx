import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./components/Auth.tsx";
import Home from "./components/Home.tsx";
import JobPage from './components/JobPage.tsx';

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
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={Auth} />
          <Route path="/job/:id" Component={JobPage} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}