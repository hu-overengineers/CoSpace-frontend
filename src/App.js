
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './page/AdminPage';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import MainLayout from './layout/MainLayout';
import ProfilePage from './page/ProfilePage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
