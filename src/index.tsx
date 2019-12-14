import '@babel/polyfill';
import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import Entry from './components/Entry';

render(<Entry />, document.getElementById('app'));
