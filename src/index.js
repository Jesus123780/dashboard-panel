import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { URL_BASE_GRAPHQL } from './api';
import Context from './Context'
// Componentes
import { Maintenance } from './components/Maintenance'
// Apollo config
const client = new ApolloClient({
    uri: URL_BASE_GRAPHQL,
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem('token') || '',
    }
})
const production = true
//eslint-disable-next-line
console.log('%c WARNING :', 'color:red;font-size:28px;');
//eslint-disable-next-line
console.log('%c CONSOLA SOLO PARA DESARROLLADORES', 'color:red;font-size:12px;');
ReactDOM.render(
    <Context.Provider>
        <React.StrictMode>
            <ApolloProvider client={client}>
                {!production ? ReactDOM.createPortal(<Maintenance />,
                    document.querySelector('#portal')
                ) : <App />}
            </ApolloProvider>
        </React.StrictMode>
    </Context.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();