import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import useStyle from './styles'
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from "react-router-dom";
import {getHashTags} from "../../api/api_tweet";
import {setHashTagList, useTweetDispatch, useTweetState} from "../../context/TweetContext";
import { toast} from "react-toastify";
import {useTranslation} from "react-i18next";


const RightSidebar = () => {

  const {t} = useTranslation();
  const classes = useStyle();
  const {hashTags} = useTweetState();
  const tweetDispatch = useTweetDispatch();
  useEffect(() => {
    getHashTags((isOk, data) => {
      if (!isOk)
        return toast.error(t("error.hashTagFetch"));
      setHashTagList(tweetDispatch,data);
    })
  }, []);

  return (
    <div className={classes.root}>
      <Link to={"/"}>
        <Grid container direction={"row"} alignItems={'center'}>
          <Grid item>
            <img src={"/images/logo.png"}/>
          </Grid>
          <Grid item>
            <Typography className={classes.logoType}>
              {t("appName")}
            </Typography>
          </Grid>
        </Grid>
      </Link>
      <Typography className={classes.hashTagTitle}>
        {t("hashTagTitle")}
      </Typography>
      <Grid container direction={"column"} alignItems={"center"}>
        {
          hashTags.map(item => <ButtonBase className={classes.hashTagParent}>
              <Link to={"/hashtags/" + item.text} style={{width: '100%'}}>
                <Grid item container>
                  <img src={"/images/hashtag.png"}/>
                  <Typography className={classes.hashtag}>
                    {item.text}
                  </Typography>
                </Grid>
              </Link>
            </ButtonBase>
          )
        }
      </Grid>
    </div>
  );
};

export default RightSidebar;