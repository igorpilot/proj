import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store/store';

export const store = new Store();
export const Context = createContext({ store });
const startApp = async () => {

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    root.render(
        <Context.Provider value={{store}}><App /></Context.Provider>
    );
}
startApp();
