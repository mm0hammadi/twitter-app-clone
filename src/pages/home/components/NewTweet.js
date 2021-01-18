import React from 'react';
import useStyle from '../styles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import classnames from 'classnames'
import {newTweetRequest} from "../../../api/api_tweet";
import {toast} from "react-toastify";
import {
  setTweetText as setTweet,
  updateHashTagList,
  useTweetDispatch,
  useTweetState
} from "../../../context/TweetContext";
import {useTranslation} from "react-i18next";

const NewTweet = ({updateTweets}) => {

  const inputFile = React.useRef();

  const {t} = useTranslation();
  const {tweetText: tweet} = useTweetState();
  const tweetDispatch = useTweetDispatch();
  // const [tweet, setTweet] = React.useState();
  const [imageFile, setImageFile] = React.useState();
  const [imagePath, setImagePath] = React.useState();


  const newTweetClick = () => {
    const tweetText = tweet;
    if (!tweetText)
      return;
    const formData = new FormData();
    formData.append("text", tweetText);
    if (imageFile)
      formData.append("image", imageFile);
    newTweetRequest(formData, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      toast.success(t("success.newTweet"));
      updateTweets();
      setTweet(tweetDispatch, "");
      setImagePath();
      setImageFile();
      if (tweetText.includes("#"))
        updateHashTagList(tweetDispatch);
    })
  };

  const getImage = () => {
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    return "/images/person.png"
  };

  const onChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const selectImg = () => {
    inputFile.current.click();
  };

  const classes = useStyle();
  return (
    <div className={classes.newTweet}>
      <Grid container>
        <img src={getImage()} style={{width: 60, height: 60, borderRadius: '50%'}} alt="Foo eating a sandwich." />
        <input placeholder={t("label.doTweet")} className={classnames(classes.input)}
               value={tweet} onChange={e => setTweet(tweetDispatch, e.target.value)}
        />
        <input type={"file"} style={{display: 'none'}} ref={inputFile} onChange={onChangeImg}/>
      </Grid>
      {
        imagePath &&
        <div>
          <div style={{backgroundImage: `url(${imagePath})`}} className={classes.tweetImg}/>
        </div>
      }
      <Grid container direction={"row-reverse"} style={{marginTop: 16}}>
        <Button variant={"contained"} color={"primary"}
                className={classes.newTweetBtn} onClick={newTweetClick}>{t("btn.tweet")}</Button>
        <IconButton className={classes.newTweetImgBtn} onClick={selectImg}>
          <img src={"/images/tweetpic.png"} className={classes.newTweetImg} alt="Foo eating a sandwich." />
        </IconButton>
      </Grid>
    </div>
  );
};

export default NewTweet;