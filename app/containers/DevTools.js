import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// import ChartMonitor from 'redux-devtools-chart-monitor';

// Enable LogMonitor to view the tabular debugging output for the store
// Alternatively enable ChartMonitor to view a tree structure of your store/state object

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-y">
    <LogMonitor />
    {/* <ChartMonitor /> */}
  </DockMonitor>
);
