import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { FirebaseContext } from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";

render(
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
    </FirebaseContext.Provider>, 
    document.getElementById('instagram')
);
