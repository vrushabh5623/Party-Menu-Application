import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import Menu from "./component/Menu";
import MenuItem from "./component/MenuItem";
import SavedRecipes from "./component/SavedRecipes";
import NotFound from "./component/NotFound";
import ProtectedRoute from "./component/ProtectedRoute";
import './App.css'

// const LoginPage = () => <h1>Login Page</h1>;
// const Home = () => <h1>Home Page</h1>;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Menu} />
      <ProtectedRoute exact path="/menu/:id" component={MenuItem} />
      <ProtectedRoute exact path="/saved-recipes" component={SavedRecipes} />

      <Route exact path="/NotFound" component={NotFound} />
      <Redirect to="/NotFound"/>
    </Switch>
  </BrowserRouter>
);

export default App;