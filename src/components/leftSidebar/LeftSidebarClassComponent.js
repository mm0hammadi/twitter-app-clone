import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import {Tweeter} from "./LeftSidebar";
import {withStyles} from '@material-ui/core/styles';
import {getUsers} from "../../api/api_tweet";


const style = {
  root: {
    backgroundColor: 'white',
    width: '25%',
    padding: '1.5rem 2rem'
  },
  profText: {
    marginLeft: '0.5rem',
    width: 'max-content',
    direction: 'ltr'
  },
  tweeterNameParent: {
    marginRight: '0.5rem',
    width: 'max-content',
  },
  profName: {
    flex: 1,
  },
  profId: {
    flex: 1,
    color: '#333',
    fontSize: '0.78rem'
  },
  tweeterRoot: {
    background: "#f5f8fa",
    marginTop: "3rem",
    borderRadius: "2.5rem",
    padding: "11px 24px"
  },
  tweeterTitle: {
    fontSize: '1.1rem !important',
    fontWeight: "600 !important",
    marginBottom: '11px'
  },
  tweeterParent: {
    padding: '10px 0'
  }
}

class LeftSidebarClassComponent extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    getUsers((isOk, data) => {
      if (!isOk)
        return alert("ناموفق تو گرفتن لیست یوزرا");
      this.setState({
        users: data
      })
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction={"row-reverse"}>
          <img src={"/images/user img.png"} style={{width: 'max-content'}}/>
          <Grid item container direction={"column"} style={{width: 'max-content'}} className={classes.profText}>
            <Typography className={classes.profName}>محمد مطواعی</Typography>
            <Typography className={classes.profId}>Mohammad.metvayi</Typography>
          </Grid>
        </Grid>
        <Grid item container direction={"column"} className={classes.tweeterRoot}>
          <Typography className={classes.tweeterTitle}>
            بهترین خبرنگاران
          </Typography>
          <Divider style={{marginLeft: -24, marginRight: -24}}/>
          {
            this.state.users.map((item, index) => {
              return (<Link to={`/users/${item.name}`} style={{width: "100%"}}>
                <Tweeter name={item.name} id={item.id} img={item.img}/>
                {index !== this.state.users.length - 1 &&
                <Divider style={{marginLeft: -24, marginRight: -24}}/>
                }
              </Link>)
            })
          }
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(LeftSidebarClassComponent);

