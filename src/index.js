import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/registration/Login/login';
import Enter from './components/registration/enter/enter';
import Profile from './components/profile/profile';
import UserStore from './components/userStore/userStore';
import Statistic from './components/Statistic/statistic';
import UserStoreEnter from './components/userStore/userStoreEnter/userStoreEnter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store = {store}>
              <Routes>
                  <Route path='/' element = {<App /> }></Route>
                  <Route path='/Login' element = {<Login/> }></Route>
                  <Route path='/Enter' element = {<Enter/> }></Route>
                  <Route path='/Profile' element = {<Profile /> }></Route>
                  <Route path='/Store/:id' element = {<UserStore /> }></Route>
                  <Route path='/Statistic' element = {<Statistic /> }></Route>
                  <Route path='/SecretAccessForm/:id' element = {<UserStoreEnter /> }></Route>
              </Routes>
      </Provider>
  </BrowserRouter>
);

