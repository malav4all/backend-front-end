import { Route, Redirect, RouteProps } from "react-router-dom";
import { doesUserHasAccessTo } from "../../../utils/AuthorizationManager";
import UnauthorizedPage from "../../../screens/UnauthorizedPage/UnauthorizedPage";
import strings from "../../constants/StringConstants";
import PageNotFound from "../../../screens/PageNotFound/PageNotFound";
import { useAppSelector } from "../../../utils/hooks";
import { selectSidebar } from "../../../redux/authSlice";

interface CustomProps extends RouteProps {
  component?: any;
  isLoggedIn: boolean;
  componentName: string;
}

const PrivateRoute = (props: CustomProps) => {
  const { component: Component, isLoggedIn, componentName, ...rest } = props;
  const sidebar = useAppSelector(selectSidebar);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          doesUserHasAccessTo(componentName, sidebar) ? (
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
