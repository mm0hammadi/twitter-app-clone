import React, {useEffect} from 'react';
import useStyle from "../home/styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TweetList from "../home/components/TweetList";
import {getTweetsByHashTagRequest} from "../../api/api_tweet";
import {toast} from "react-toastify";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import {useLocation} from 'react-router-dom';

const TweetByHashTag = (props) => {

  const location = useLocation();
  const {tweetList} = useTweetState();
  const tweetDispatch = useTweetDispatch();
  useEffect(() => {
    getTweetsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      setTweetList(tweetDispatch, data);
    })
  }, [location]);

  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.hashtag} icon={<img src={"/images/hashtag.png"}/>}/>
      <Divider className={classes.divider}/>
      <TweetList data={tweetList}/>
    </div>
  );
};

export default TweetByHashTag;