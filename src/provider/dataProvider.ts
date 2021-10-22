// src/provider/dataProvider.ts
import fakeDataProvider from 'ra-data-fakerest';
import hands from './data/hands';

const dataProvider = fakeDataProvider({
  users: [
    { id: 0, name: 'User1', email: 'user1@example.com' },
    { id: 1, name: 'User2', email: 'user2@example.com' },
  ],
  profiles: [
    { id: 0, user_id: 0, name: 'User1- Profile 1' },
    { id: 2, user_id: 0, name: 'User1- Profile 2' },
    { id: 3, user_id: 1, name: 'User2- Profile 1' },
  ],
  waves: [{ id: 0, name: 'Default' }],
  hands: hands,
});

export default dataProvider;
