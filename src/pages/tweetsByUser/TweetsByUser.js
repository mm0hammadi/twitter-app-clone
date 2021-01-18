import React, {useEffect, useState} from 'react';
import useStyle from "../home/styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TweetList from "../home/components/TweetList";
import PersonIcon from '@material-ui/icons/Person';
import {getTweetsByUserRequest} from "../../api/api_tweet";
import {useLocation} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

const TweetsByUser = (props) => {

  const [tweets, setTweets] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getTweetsByUserRequest(props.match.params.id, (isOk, data) => {
      if (!isOk)
        return alert(data.message);
      else setTweets(data);
    });
  }, [location]);

  const {t} = useTranslation();
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.name} icon={<PersonIcon/>}/>
      <Divider className={classes.divider}/>
      {tweets.length === 0 &&
      <Typography>{t("warn.noTweetFromUser")}</Typography>
      }
      <TweetList data={tweets}/>
    </div>
  );
};

export default TweetsByUser;