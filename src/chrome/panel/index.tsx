import React from 'react';
import ReactDom from 'react-dom';
import { reloadEvent } from '../utils/reloadEvent';
reloadEvent(() => setTimeout(() => location.reload(), 500));
ReactDom.render(<h1>hello </h1>, document.getElementById('root'));
