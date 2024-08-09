import React, { FC, useState } from "react";
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
  Box,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { HiMiniBellAlert } from "react-icons/hi2";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../global/components/CustomButton/CustomButton";
import history from "../../../utils/history";
import dashboardStyles from "../DashboardStyles";
import { MdAddchart } from "react-icons/md";
import CustomDialog from "../../../global/components/CustomDialog/CustomDialog"; // Import CustomDialog
import { IoReloadOutline } from "react-icons/io5";
interface HeaderProps {
  local_varaiable: any;
}

const deviceGroups = [
  { label: "Group 1" },
  { label: "Group 2" },
  { label: "Group 3" },
  { label: "Group 4" },
];

const chartOptions = ["Pie Chart", "Bar Chart", "Line Chart", "Area Chart"];

const Header: FC<HeaderProps> = ({ local_varaiable }) => {
  const theme = useTheme();
  const classes = dashboardStyles;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      color: "primary",
      avatarColor: "bg-primary",
      icon: "ti-gift",
      text1: "Temper Alert",
      text2: "This is Temper Alert Message",
    },
    {
      id: 2,
      color: "secondary",
      avatarColor: "bg-secondary",
      icon: "ti-discount-2",
      text1: "Temper Alert",
      text2: "This is Temper Alert Message",
    },
    {
      id: 3,
      color: "pink",
      avatarColor: "bg-pink",
      icon: "ti-user-check",
      text1: "Temper Alert",
      text2: "This is Temper Alert Message",
    },
    {
      id: 4,
      color: "warning",
      avatarColor: "bg-warning",
      icon: "ti-circle-check",
      text1: "Temper Alert",
      text2: "This is Temper Alert Message",
    },
    {
      id: 5,
      color: "success",
      avatarColor: "bg-success",
      icon: "ti-clock",
      text1: "Temper Alert",
      text2: "This is Temper Alert Message",
    },
  ]);
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<string | null>(
    null
  );
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);

  const handleToggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleToggleChart = (chart: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chart)
        ? prev.filter((item) => item !== chart)
        : [...prev, chart]
    );
  };

  const handleApplyCharts = () => {
    console.log("Selected Charts:", selectedCharts);
    setDialogOpen(false);
    // Handle the selected charts here
  };

  const dialogTitleContent = <span>Select Charts</span>;
  const dialogBodyContent = (
    <FormControl component="fieldset">
      <FormGroup>
        {chartOptions.map((chart) => (
          <FormControlLabel
            key={chart}
            control={
              <Checkbox
                checked={selectedCharts.includes(chart)}
                onChange={() => handleToggleChart(chart)}
                name={chart}
              />
            }
            label={chart}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
  const dialogFooterContent = (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <CustomButton
        id="device_group_cancel_button"
        label="Cancel"
        onClick={() => {
          handleDialogClose();
        }}
        customClasses={{
          ...classes.cancelButtonStyle,
          color: theme.palette.text.primary,
          backgroundColor: "#00000000",
        }}
      />
      <CustomButton
        id="add_device_group_submit_button"
        label={"Add"}
        onClick={() => {}}
      />
    </Box>
  );

  return (
    <>
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
              <Link to={`dashboards/crm/`} className="header-logo"></Link>
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                onClick={handleToggleDropdown}
                aria-controls="notifications-menu"
                aria-haspopup="true"
              >
                <HiMiniBellAlert />
              </IconButton>

              <Menu
                id="notifications-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ maxWidth: "500px" }}
              >
                {notifications.map((notification, index) => (
                  <MenuItem key={notification.id}>
                    <Avatar className={notification.avatarColor}>
                      <i className={notification.icon}></i>
                    </Avatar>
                    <Box>
                      <Box sx={{ width: "auto" }}>{notification.text1}</Box>
                      <br />
                      <Box sx={{ marginTop: "-10px" }}>
                        {notification.text2}
                      </Box>
                    </Box>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedNotifications = [...notifications];
                        updatedNotifications.splice(index, 1);
                        setNotifications(updatedNotifications);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </MenuItem>
                ))}
                <CustomButton
                  label={"See all"}
                  onClick={() => {
                    history.push("/alert-reports");
                  }}
                  customClasses={{
                    width: "90%",
                    margin: "1rem auto",
                  }}
                />
              </Menu>

              <IconButton onClick={handleDialogOpen}>
                <IoReloadOutline  />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <CustomDialog
        isDialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogTitleContent={dialogTitleContent}
        dialogBodyContent={dialogBodyContent}
        dialogFooterContent={dialogFooterContent}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps)(Header);
