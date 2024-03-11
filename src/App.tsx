import history from "./utils/history";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";

import withClearCache from "./ClearCache";
import Box from "@mui/system/Box";
import Notifications from "./utils/notifications";
import LandingPage from "./screens/LandingPage/LandingPage";
import Layout from "./screens/Shared/Layout/Layout";
import PageNotFound from "./screens/PageNotFound/PageNotFound";

const App = () => {
  return <ClearCacheComponent />;
};

const MainApp = () => {
  return (
    <Box>
      <BrowserRouter getUserConfirmation={() => {}}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={[
                "/",
                "/login",
                "/forgot-password",
                "/register",
                "/changepwd",
                "/activate",
                "/connectionLost",
              ]}
              component={LandingPage}
            />

            <Layout />
            <Route path={""} component={PageNotFound} />
          </Switch>
          <Notifications />
        </Router>
      </BrowserRouter>
    </Box>
  );
};

const ClearCacheComponent = withClearCache(MainApp);

export default App;
