import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsOpen(!matches);
  }, [matches]);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#002884" }}>
        <Toolbar>
          {!matches && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            ChildChaser
          </Typography>
          {(isOpen || matches) && (
            <>
              <Button className={classes.button} color="inherit">
                My child is missing
              </Button>
              <Button className={classes.button} color="inherit">
                I have sighted a child
              </Button>
              <Button className={classes.button} color="inherit">
                Search a missing child
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
