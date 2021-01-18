import React, {useEffect, useState} from 'react';
import useStyle from './styles'
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import NewTweet from "./components/NewTweet";
import TweetList from "./components/TweetList";
import {Home as HomeIcon} from "@material-ui/icons";
import {getAllTweets} from "../../api/api_tweet";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const Home = () => {
  const classes = useStyle();
  const {t} = useTranslation();

  const tweetDispatch = useTweetDispatch();
  const {tweetList : tweets} = useTweetState();
  // const [tweets, setTweets] = useState([]);

  useEffect(() => {
    updateTweets();
  }, []);

  const updateTweets = () => {
    getAllTweets((isOk, data) => {
      if (!isOk)
        return toast.error(t("error.tweetFetch"));
      setTweetList(tweetDispatch,data);
    })
  }

  return (
    <div className={classes.root}>
      <Header title={t("home")} icon={<HomeIcon/>}/>
      <Divider className={classes.divider}/>
      <NewTweet updateTweets={updateTweets}/>
      <TweetList data={tweets}/>
    </div>
  );
};

export default Home;