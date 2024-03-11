import { Route, Redirect, RouteProps } from "react-router-dom";
import { doesUserHasAccessTo } from "../../../utils/AuthorizationManager";
import UnauthorizedPage from "../../../screens/UnauthorizedPage/UnauthorizedPage";
import strings from "../../constants/StringConstants";
import PageNotFound from "../../../screens/PageNotFound/PageNotFound";

interface CustomProps extends RouteProps {
  component?: any;
  isLoggedIn: boolean;
  componentName: string;
}

const PrivateRoute = (props: CustomProps) => {
  const { component: Component, isLoggedIn, componentName, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          doesUserHasAccessTo(componentName) ? (
            <Component {...routeProps} />
          ) : componentName === strings.PAGENOTFOUND ? (
            <PageNotFound />
          ) : (
            <UnauthorizedPage pageName={componentName} />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: routeProps.location,
                search: routeProps.location.search,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
