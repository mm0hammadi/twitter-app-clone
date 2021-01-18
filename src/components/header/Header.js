import React from 'react';
import Typography from "@material-ui/core/Typography";
import useStyle from './styles'

const Header = ({title,icon}) => {
  const classes = useStyle();
  return (
    <div className={classes.header}>
      {icon}
      <Typography className={classes.headerTitle}>
        {title}
      </Typography>
    </div>
  );
};

export default Header;