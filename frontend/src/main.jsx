import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'
import { Provider } from "@/components/ui/provider"



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
  <Provider>
     <App />
  </Provider>
  </ShopContextProvider>
  </BrowserRouter>,
)
