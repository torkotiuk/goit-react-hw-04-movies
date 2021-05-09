import { Route, NavLink, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import Container from './Components/share/Container';
// Nav styles
import NavStyle from './styles/Nav.scss';
import Nav from './styles/Nav.module.scss';

const App = () => {
  return (
    <>
      <Container>
        <ul className={Nav.List}>
          <li className={Nav.ListItem}>
            <NavLink
              exact
              to="/"
              style={NavStyle.Navlink}
              activeStyle={NavStyle.active}
            >
              Home
            </NavLink>
          </li>
          <li className={Nav.ListItem}>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </Container>

      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />;
          <Route path="/movies/:movieId" component={MovieDetailsPage} />;
          <Route path="/movies" component={MoviesPage} />;
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
