import Header from './components/Header';
import { Navigate, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import ArchivesPage from './pages/ArchivesPage';
import NoteNewPage from './pages/NoteNewPage'
import DetailNote from './pages/DetailNote';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import useLocaleContext from './hooks/useLocaleContext';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import { getUserLogged, putAccessToken } from './utils/api';
import RegisterPage from './pages/RegisterPage';
import LocalProvider from './contexts/LocalProvider';
import PropTypes from 'prop-types';

//auth protection
function RequireAuth ({ children }) {
  const localCtx = useLocaleContext();
  const location = useLocation();

    return (
      (localCtx.accessToken != null && localCtx.accessToken != 'null')
        ? children
        : <Navigate to="/login" state={{ from:location}} replace />
    );
};

RequireAuth.propTypes = {
  children: PropTypes.any
};

//Layout 
function LayoutApp({user, logoutHandler}) {  
  return (
    <LocalProvider>
      <div className="app-container">
        <Header user={user} logoutHandler={logoutHandler}/>
        <main>
          <Outlet />
        </main>
      </div>
    </LocalProvider>
  )
}

LayoutApp.propTypes = {
  user: PropTypes.object,
  logoutHandler: PropTypes.func
};

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setUser(data)
    });
    
    return () => {
      setUser(null);
    } 
  }, [])

  async function loginHandler(token) {
    putAccessToken(token);
    const { data, error } = await getUserLogged();
    if (!error) {
      setUser(data);
      navigate('/');
    }
  }

  function logoutHandler() {
    putAccessToken('');
    setUser(null);
    navigate('/');
  }

  let element = useRoutes([
    {
      element: <LayoutApp user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          index: true,
          path: "/",
          element: <RequireAuth><HomePage /></RequireAuth>,
        },
        {
          path: "/archives",
          element: <RequireAuth><ArchivesPage /></RequireAuth>
        },
        {
          path: "/notes/new",
          element: <RequireAuth><NoteNewPage /></RequireAuth>
        },
        {
          path: "/notes/:id",
          element: <RequireAuth><DetailNote /></RequireAuth>
        },
        {
          path: "/archives/notes/:id",
          element: <RequireAuth><DetailNote /></RequireAuth>
        },
        {
          path: "*",
          element: <NotFoundPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/login',
          element: <LoginPage loginHandler={loginHandler} />
        }
      ],
    },
  ]);

  return element;
}

export default App;
