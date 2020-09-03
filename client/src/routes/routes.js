import React from 'react';

const User = React.lazy(() => import('../component/User'));
const Login = React.lazy(() => import('../component/Login'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home',component: User },
  { path: '/login', exact: true, name: 'Home',component: Login },

 





];



export default routes;


