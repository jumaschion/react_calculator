import './index.css';

import * as serviceWorker from './serviceWorker';

import Calculator from './main/Calculator';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Calculator />, document.getElementById('root'));

serviceWorker.unregister();
