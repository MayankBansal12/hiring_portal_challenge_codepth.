import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./components/Auth.tsx";
import Home from "./components/Home.tsx";
import JobPage from './components/JobPage.tsx';
import CreateJob from './components/CreateJob.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./context/Firebase";
import { useRecoilState } from 'recoil';
import { userAtom } from './atoms/user.ts';
import 'noty/lib/noty.css';
import "noty/lib/themes/semanticui.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email
        })
      } else
        setUser(null);
    })
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={Auth} />
          <Route path="/job/:id" Component={JobPage} />
          <Route path="/create" Component={CreateJob} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}