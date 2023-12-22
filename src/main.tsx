import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FirebaseProvider } from "./context/Firebase";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
