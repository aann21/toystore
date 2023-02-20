import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import { StateProvider } from "./context/StateProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";


import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';


ReactDOM.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>, 
    document.getElementById("root")
    
);
