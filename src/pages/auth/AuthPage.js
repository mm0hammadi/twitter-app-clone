import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from './styles'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {toast} from "react-toastify";
import {loginApi, registerApi} from "../../api/api_auth";
import {useTranslation} from "react-i18next";

const LOGIN_TAB_VALUE = 1;
const REG_TAB_VALUE = 2;

const AuthPage = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  const [tab, setTab] = useState(LOGIN_TAB_VALUE);

  //login state
  const [usernameLogin, setUsernameLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();

  //register state
  const [fullNameRegister, setFullNameRegister] = useState();
  const [usernameRegister, setUsernameRegister] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [confPasswordRegister, setConfPasswordRegister] = useState();


  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const validateLogin = (user) => {
    if (!user.username)
      return t("validate.userName");
    if (!user.password)
      return t("validate.password")
  };
  const validateRegister = (user) => {
    if (!user.username)
      return t("validate.userName");
    if (!user.name)
      return t("validate.name");
    if (!user.password)
      return t("validate.password");
    if (user.password !== user.confPasswordRegister)
      return t("validate.confPassword")
  };

  const handleRegister = () => {
    const user = {
      name: fullNameRegister,
      username: usernameRegister,
      password: passwordRegister,
      confPasswordRegister: confPasswordRegister,
    };
    const error = validateRegister(user);
    if (error)
      return toast.warn(error);
    user.confPasswordRegister = undefined;
    registerApi(user, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      toast.success(t("success.register"));
      localStorage.setItem("name", data.name);
      localStorage.setItem("image", data.image);
      localStorage.setItem("username", data.username);
      localStorage.setItem("x-auth-token", data["x-auth-token"]);
      window.location.reload();
    })
  };
  const handleLogin = () => {
    const user = {
      username: usernameLogin,
      password: passwordLogin
    };
    const error = validateLogin(user);
    if (error)
      return toast.warn(error);
    loginApi(user, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      toast.success(t("success.login"));
      localStorage.setItem("name", data.name);
      localStorage.setItem("image", data.image);
      localStorage.setItem("username", data.username);
      localStorage.setItem("x-auth-token", data["x-auth-token"]);
      window.location.reload();
    })
  };

  return (
    <Paper className={classes.container}>
      <Typography className={classes.headerText}>{t("welcome")}</Typography>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
      >
        <Tab label={t("tab.login")} value={LOGIN_TAB_VALUE} className={classes.tab}/>
        <Tab label={t("tab.register")} value={REG_TAB_VALUE} className={classes.tab}/>
      </Tabs>
      {tab === LOGIN_TAB_VALUE &&
      <div className={classes.containerInput}>
        <Typography>{t("label.username")}</Typography>
        <Input className={"uni_m_b_small"}
               value={usernameLogin} onChange={e => setUsernameLogin(e.target.value)}
        >
        </Input>
        <Typography>{t("label.password")}</Typography>
        <Input className={"uni_m_b_small"}
               value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}
        />
        <Button variant={"contained"} color="primary" onClick={handleLogin}>{t("btn.login")}</Button>
      </div>
      }
      {tab === REG_TAB_VALUE &&
      <div className={classes.containerInput}>
        <Typography>{t("label.fullName")}</Typography>
        <Input className={"uni_m_b_small"}
               value={fullNameRegister} onChange={e => setFullNameRegister(e.target.value)}
        />
        <Typography>{t("label.username")}</Typography>
        <Input className={"uni_m_b_small"}
               value={usernameRegister} onChange={e => setUsernameRegister(e.target.value)}
        />
        <Typography>{t("label.password")}</Typography>
        <Input className={"uni_m_b_small"}
               value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)}
        />
        <Typography>{t("label.confPassword")}</Typography>
        <Input className={"uni_m_b_small"}
               value={confPasswordRegister} onChange={e => setConfPasswordRegister(e.target.value)}
        />
        <Button variant={"contained"} color="primary" onClick={handleRegister}>{t("btn.register")}</Button>
      </div>
      }
    </Paper>
  );
};

export default AuthPage;