import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Introduction from './components/Introduction';
import DrawContainer from './containers/drawContainer';

export default (
	<Switch>
		<Route exact path="/" component={Introduction} />
		<Route exact path="/sketch/:shape" component={DrawContainer} />
	</Switch>
);
