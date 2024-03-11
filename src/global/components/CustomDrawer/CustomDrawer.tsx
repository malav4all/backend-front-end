import customDrawerStyles from "./CustomDrawer.style";
import { Box, SwipeableDrawer } from "@mui/material";
interface CustomProps {
  isOpen: boolean;
  toggleDrawer: Function;
  drawerTitle?: JSX.Element;
  drawerBody: JSX.Element | undefined;
  className?: any;
  side: any;
}

const CustomDrawer = (props: CustomProps) => {
  const classes = customDrawerStyles();
  const appliedClasses = props.className
    ? { paper: props.className }
    : { paper: classes.drawerStyle };

  return (
    <SwipeableDrawer
      classes={appliedClasses}
      anchor={props.side}
      open={props.isOpen}
      onClose={() => props.toggleDrawer(false)}
      onOpen={() => props.toggleDrawer(true)}
    >
      <Box my={1}>{props.drawerTitle ? props.drawerTitle : null}</Box>
      {props.drawerBody}
    </SwipeableDrawer>
  );
};

export default CustomDrawer;
