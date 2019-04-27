import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './App.scss';
import {App} from './components/App';
import {MapWithAMarker} from './components/GoogleMaps';
import * as serviceWorker from './serviceWorker';
// export for others scripts to use

// google maps: api key : AIzaSyBhwrEE_qhFtG7f1KYUA1NeBkehf2nvltk

ReactDOM.render(<App />, document.getElementById('App'));
/*ReactDOM.render(<AddUser />, document.getElementById('AddUser'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
