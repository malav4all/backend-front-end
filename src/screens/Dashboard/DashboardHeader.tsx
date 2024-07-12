import React, { FC, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Grid,
  Avatar,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  local_varaiable: any;
}

const Header: FC<HeaderProps> = ({ local_varaiable }) => {
  const theme = useTheme();
  const [fullScreen, setFullScreen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      color: "primary",
      avatarColor: "bg-primary",
      icon: "ti-gift",
      text1: "Your Order Has Been Shipped",
      text2: "Order No: 123456 Has Shipped To YourDelivery Address",
    },
    {
      id: 2,
      color: "secondary",
      avatarColor: "bg-secondary",
      icon: "ti-discount-2",
      text1: "Discount Available",
      text2: "Discount Available On Selected Products",
    },
    {
      id: 3,
      color: "pink",
      avatarColor: "bg-pink",
      icon: "ti-user-check",
      text1: "Account Has Been Verified",
      text2: "Your Account Has Been Verified Successfully",
    },
    {
      id: 4,
      color: "warning",
      avatarColor: "bg-warning",
      icon: "ti-circle-check",
      text1: "Order Placed",
      text2: "Order Placed Successfully",
    },
    {
      id: 5,
      color: "success",
      avatarColor: "bg-success",
      icon: "ti-clock",
      text1: "Order Delayed",
      text2: "Order Delayed Unfortunately",
    },
  ]);

  const toggleFullScreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setFullScreen(false));
    }
  };

  const handleFullscreenChange = () => {
    setFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClose = (e: any, index: number) => {
    e.stopPropagation();
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <AppBar
      position="static"
      className="app-header"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Toolbar className="main-header">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link to={`dashboards/crm/`} className="header-logo">
              <img src="/path/to/logo.png" alt="Logo" />
            </Link>
          </Grid>
          <Grid item>
            <IconButton onClick={() => {}}>
              <MenuIcon />
            </IconButton>
            <IconButton onClick={toggleFullScreen}>
              {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
            <IconButton
              onClick={handleToggleDropdown}
              aria-controls="notifications-menu"
              aria-haspopup="true"
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="notifications-menu"
              open={Boolean(isDropdownOpen)}
              onClose={handleToggleDropdown}
            >
              {notifications.map((notification, index) => (
                <MenuItem key={notification.id}>
                  <Avatar className={notification.avatarColor}>
                    <i className={notification.icon}></i>
                  </Avatar>
                  <div>
                    <span>{notification.text1}</span>
                    <br />
                    <span>{notification.text2}</span>
                  </div>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleNotificationClose(e, index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps)(Header);
