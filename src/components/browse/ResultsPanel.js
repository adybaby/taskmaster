import React from 'react';
import { BrowsePanel } from './BrowsePanel';
import { TaskList } from './TaskList';

export const ResultsPanel = () => (
  <div>
    <BrowsePanel />
    <TaskList />
  </div>
);
