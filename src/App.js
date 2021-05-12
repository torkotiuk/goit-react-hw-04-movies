import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from './Components/share/Container';
import AppBar from './Components/AppBar';
import routes from './routes';

const HomePage = lazy(() =>
  import('./pages/HomePage.jsx' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage.jsx' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage.jsx' /* webpackChunkName: "movieDetails-page" */
  ),
);

const App = () => {
  return (
    <>
      <AppBar />

      <Container>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
