import React, {useEffect, useRef, useState} from 'react';
import useStyle from './styles'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from "react-router-dom";
import {getUsers} from "../../api/api_tweet";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {uploadUserPhoto} from "../../api/api_auth";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export const Tweeter = ({name, id, img}) => {
  const classes = useStyle();

  const getImage = () => {
    if (img)
      return img;
    return "/images/person.png"
  }

  return <ButtonBase style={{width: "100%"}}><Grid container direction={"row"} className={classes.tweeterParent}>
    <img src={getImage()} className={classes.twitterImg}/>
    <Grid item container direction={"column"} style={{width: 'max-content'}} alignItems={"flex-start"}
          className={classes.tweeterNameParent}>
      <Typography className={classes.profName}>{name}</Typography>
      <Typography className={classes.profId}>{id}</Typography>
    </Grid>
  </Grid></ButtonBase>
}


const LeftSidebar = () => {
  const {t, i18n} = useTranslation();
  const [users, setUsers] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();
  const [anchorMenu, setAnchorMenu] = useState();
  const inputRef = useRef();

  useEffect(() => {
    getUsers((isOk, data) => {
      if (!isOk)
        return toast.error(t("error.userFetchError"));
      setUsers(data);
    })
  }, []);

  const handleToggleMenu = (e) => {
    if (anchorMenu)
      setAnchorMenu(null);
    else
      setAnchorMenu(e.currentTarget);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      uploadUserPhoto(formData, (isOk, data) => {
        if (!isOk)
          return toast.error(data);
        toast.success(t("success.uploadProfPic"))
        localStorage.setItem("image", data.imagePath);
      })
    }
  };

  const changeLang = () => {
    if (i18n.language === "fa") {
      localStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
    } else {
      localStorage.setItem("lang", "fa");
      i18n.changeLanguage("fa");
    }
  };

  const getImage = () => {
    if (imagePath)
      return imagePath;
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    return "/images/user-profiles.png"
  };

  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container direction={"row-reverse"} onClick={handleToggleMenu} style={{cursor: 'pointer'}}>
        <img src={getImage()} style={{width: 50, height: 50, borderRadius: '50%'}}/>
        <Grid item container direction={"column"} style={{width: 'max-content'}} className={classes.profText}>
          <Typography className={classes.profName}>{localStorage.getItem("name")}</Typography>
          <Typography className={classes.profId}>{localStorage.getItem("username")}</Typography>
        </Grid>
        <input ref={inputRef} type={'file'} style={{display: 'none'}} onChange={handleAvatarChange}/>
      </Grid>
      <Grid item container direction={"column"} className={classes.tweeterRoot}>
        <Typography className={classes.tweeterTitle}>
          {t("userListTitle")}
        </Typography>
        <Divider style={{marginLeft: -24, marginRight: -24}}/>
        {
          users.map((item, index) => {
            return (<Link to={`/users/${item._id}/${item.name}`} style={{width: "100%"}}>
              <Tweeter name={item.name} id={item.username} img={item.image}/>
              {index !== users.length - 1 &&
              <Divider style={{marginLeft: -24, marginRight: -24}}/>
              }
            </Link>)
          })
        }
      </Grid>
      <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu}>
        <MenuItem onClick={() => {
          inputRef.current.click();
        }}>{t("editProfilePhotoMenu")}</MenuItem>
        <MenuItem onClick={() => {
          changeLang()
        }}>{t("changeLangMenu")}</MenuItem>
        <MenuItem onClick={() => {
          localStorage.clear();
          window.location.reload()
        }}>{t("logoutMenu")}</MenuItem>
      </Menu>
    </div>
  );
};

export default LeftSidebar;