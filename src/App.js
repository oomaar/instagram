import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes"

const Login = lazy(() => import('./screens/LoginScreen'));
const Signup = lazy(() => import('./screens/SignupScreen'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
        </Switch>
        </Suspense>
    </Router>
  );
}

export default App;
