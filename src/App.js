
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './page/AdminPage';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
