import {
  CheckCircleOutline,
  ErrorOutline,
  WarningOutlined,
} from "@mui/icons-material";
import { Component } from "react";
import { CustomIcon, CustomNotification } from "../global/components";
import strings from "../global/constants/StringConstants";
import { globalEmitter } from "./emitter";

class Notifications extends Component {
  state = {
    showNotification: false,
    variant: strings.success,
    icon: <></>,
    title: "",
    message: "",
  };

  defaultSuccessIcon = (<CustomIcon icon={<CheckCircleOutline />} />);
  defaultWarningIcon = (<CustomIcon icon={<WarningOutlined />} />);
  defaultErrorIcon = (<CustomIcon icon={<ErrorOutline />} />);

  renderElement: JSX.Element = (<></>);

  componentDidMount() {
    globalEmitter.addListener(
      strings.notification,
      this.handleNotificationEmitted
    );
  }

  componentWillUnmount() {
    globalEmitter.removeListener(
      strings.notification,
      this.handleNotificationEmitted
    );
  }

  handleClose = () => {
    this.setState({ showNotification: false });
  };

  handleNotificationEmitted = (event: {
    type: string;
    message: string;
    title: string;
  }) => {
    switch (event.type) {
      case strings.info:
        this.openInfoNotification(event.message, event.title);
        break;
      case strings.success:
        this.openSuccessNotification(event.message, event.title);
        break;
      case strings.warning:
        this.openWarningNotification(event.message, event.title);
        break;
      case strings.error:
        this.openErrorNotification(event.message, event.title);
        break;
      default:
        break;
    }
    this.setState({ showNotification: true });
  };

  autoHideNotification = (duration: number) => {
    // Seconds
    setTimeout(() => {
      this.handleClose();
    }, duration * 1000);
  };

  openInfoNotification = (message: string, title: string) => {
    this.setState({
      showNotification: true,
      variant: strings.info,
      title: title,
      message: message,
      icon: this.defaultErrorIcon,
    });
    this.autoHideNotification(7);
  };

  openSuccessNotification = (message: string, title: string) => {
    this.setState({
      showNotification: true,
      variant: strings.success,
      title: title,
      message: message,
      icon: this.defaultSuccessIcon,
    });
    this.autoHideNotification(7);
  };

  openWarningNotification = (message: string, title: string) => {
    this.setState({
      showNotification: true,
      variant: strings.warning,
      title: title,
      message: message,
      icon: this.defaultWarningIcon,
    });
    this.autoHideNotification(7);
  };

  openErrorNotification = (message: string, title: string) => {
    this.setState({
      showNotification: true,
      variant: strings.error,
      title: title,
      message: message,
      icon: this.defaultErrorIcon,
    });
    this.autoHideNotification(7);
  };

  render() {
    return (
      <CustomNotification
        showNotification={this.state.showNotification}
        verticalPosition="top"
        horizontalPosition="right"
        variant={this.state.variant}
        title={this.state.title}
        message={this.state.message}
        icon={this.state.icon}
        handleClose={this.handleClose}
      />
    );
  }
}

export default Notifications;
