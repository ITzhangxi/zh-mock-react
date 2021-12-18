import React from 'react';
import ReactDom from 'react-dom';
import { reloadEvent } from '../utils/reloadEvent';
reloadEvent(() => location.reload());
ReactDom.render(<h1>hello </h1>, document.getElementById('root'));
