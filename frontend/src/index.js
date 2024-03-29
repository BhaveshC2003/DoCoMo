import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./store"
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}> 
        <App />
      </AlertProvider>
      </Provider>
    </LocalizationProvider>
    
);


