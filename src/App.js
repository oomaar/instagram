import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes"

// const Login = lazy(() => import("./screens/index"));
// const Login = lazy(() => import("./screens/LoginScreen.js"));
const Login = lazy(() => import('./screens/LoginScreen'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
        </Suspense>
    </Router>
  );
}

export default App;
