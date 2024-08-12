import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import appHeaderStyles from "./AppHeader.styles";
import { drawerWidth } from "../../../utils/styles";
import AppDrawer from "../AppDrawer/AppDrawer";

const AppHeader = () => {
  const theme = useTheme();
  const classes = appHeaderStyles;
  const [menuMobileVisible, setMenuMobileVisible] = useState<boolean>(false);

  const handleMenuMobileVisibility = (event: any) => {
    setMenuMobileVisible(event.currentTarget);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setMenuMobileVisible(false);
    };

  const getMobileMenuDrawer = () => {
    return (
      <Drawer
        open={menuMobileVisible}
        onClose={toggleDrawer}
        sx={{
          paper: classes.menuMobile,
        }}
      >
        <AppDrawer setMenuMobileVisible={setMenuMobileVisible} />
      </Drawer>
    );
  };

  const getAppHeader = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            height: "0px",
            bgcolor: "transparent",
            boxShadow: "none",
            zIndex: 2,
            backgroundColor: "red",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{
                mr: 2,
                display: { md: "none" },
                color: theme.palette.text.primary,
              }}
              onClick={handleMenuMobileVisibility}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {getMobileMenuDrawer()}
      </Box>
    );
  };

  return getAppHeader();
};

export default AppHeader;
