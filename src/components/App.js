import React from 'react';
import Layout from "./layout/Layout";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../pages/home/Home";
import Page404 from '../pages/404/404'
import TweetByHashTag from "../pages/tweetsByHashtag/TweetByHashTag";
import TweetsByUser from "../pages/tweetsByUser/TweetsByUser";
import AuthPage from "../pages/auth/AuthPage";
import {TweetProvider} from "../context/TweetContext";
import '../i18n'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={AuthPage}/>
          <PrivateRoute path={"/"} render={() =>
            <TweetProvider>
              <Layout>
                <Switch>
                  <Route exact path={"/"} component={Home}/>
                  <Route exact path={"/hashtags/:hashtag"} component={TweetByHashTag}/>
                  <Route exact path={"/users/:id/:name"} component={TweetsByUser}/>
                  <Route component={Page404}></Route>
                </Switch>
              </Layout>
            </TweetProvider>
          }/>
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
};

const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({component, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return <Redirect to={"/"}/>
    else {
      return React.createElement(component, props);
    }
  }}/>
};

const PrivateRoute = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return render(props);
    else return <Redirect to={"/login"}/>
  }}/>
}

export default App;