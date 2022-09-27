import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient();

root.render(

    <UserProvider>

        <QueryClientProvider client={client} contextSharing={true}>

            <App />
        
        </QueryClientProvider>

    </UserProvider>
  
);
