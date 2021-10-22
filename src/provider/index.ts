/* eslint-disable import/no-anonymous-default-export */
// src/provider/index.ts
import dataProvider from './dataProvider';
import authProvider from './authProvider';

export default {
  dataProvider: dataProvider,
  authProvider: authProvider,
};
