import React from "react";

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; errorDetails: string; component: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorDetails: "", component: "" };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    const errorInString = error.toString();
    const componentStack = errorInfo.componentStack;
    const subString = componentStack.substring(0, 200);
    this.setState({
      errorDetails: errorInString,
      component: componentStack,
    });
    this.sendNotifyToDiscord(errorInString, componentStack);
  }

  sendNotifyToDiscord = async (title: any, description: any) => {
    try {
      const body = {
        username: "IMZ",
        avatar_url: "",
        content: "Oops! Something Went wrong",
        embeds: [
          {
            title: title,
            description: description,
          },
        ],
      };
      // const callParams = getNoAuthCallParams("POST", body);
      //const response = await makeCall(urls.webhook_URL, callParams);
    } catch (error: any) {
      console.error(error);
    }
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      try {
        return <h1>Something went wrong.</h1>;
      } catch (error) {
        throw error;
      }
    }

    return this.props.children;
  }
}
