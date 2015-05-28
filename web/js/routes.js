import React from 'react';
import { Route } from 'react-router';

import DataBase from "./components/database";

export default (
  <Route name='explore' path='/database/' handler={DataBase}>
  </Route>
);