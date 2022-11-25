import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDn8WeSDH7yoNSULSXCUsWzLwYU19kmpEs",
  authDomain: "my-react-blog-c9fb6.firebaseapp.com",
  projectId: "my-react-blog-c9fb6",
  storageBucket: "my-react-blog-c9fb6.appspot.com",
  messagingSenderId: "9216383923",
  appId: "1:9216383923:web:8ad1b8937a21dbb37249c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

