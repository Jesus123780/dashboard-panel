import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client'
import Context from './Context'
// Componentes
import { Maintenance } from './components/Maintenance'
import { apolloClient } from './apollo/client';

const production = true
//eslint-disable-next-line
console.log('%c WARNING :', 'color:red;font-size:28px;');
//eslint-disable-next-line
console.log('%c CONSOLA SOLO PARA DESARROLLADORES', 'color:red;font-size:12px;');
ReactDOM.render(
    <Context.Provider>
        <React.StrictMode>
            <ApolloProvider client={apolloClient}>
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