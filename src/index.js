import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css'
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AppProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});
root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>
);


