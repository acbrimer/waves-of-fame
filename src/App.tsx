// src/App.tsx
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './provider/dataProvider';
import { theme } from './theme';

// components
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

// resources
// import users from './resources/users';
// import profiles from './resources/profiles';
import waves from './resources/waves';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
    title="Waves of Fame"
    theme={theme}
    layout={Layout}
  >
    <Resource name="waves" {...waves} />
    <Resource name="hands" intent="registration" />
  </Admin>
);

export default App;
