import { storiesOf } from '@storybook/react';
import React from 'react';
import Table from './Table';
import { data } from './data';

storiesOf('UI-Kit', module).add('Table', () => (
  <Table data={data.response.venues} />
));
