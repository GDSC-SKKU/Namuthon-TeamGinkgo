import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cloudUpload, ellipse, home, person, square, time, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* React feature import */
import { useEffect, useState } from 'react';

/* Firebase setup */
import { firebaseConfig } from './data/config';
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, signInWithCredential, signOut } from "firebase/auth";

/* Pages import */
import pageDestinations from './data/pageDestinations';
import GuestWelcomePage from './pages/guest/Welcome';
import GuestAuthentication from './pages/guest/Authentication';
// import UserAccountPage from './pages/user/Account';
// import UserHistoryPage from './pages/user/History';
import UserDashboardPage from './pages/user/Dashboard';
import UserPlantUploadPage from './pages/user/PlantUpload';

setupIonicReact();


const App: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  setPersistence(firebaseAuth, browserSessionPersistence);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  function isLoggedIn(): boolean {
    return firebaseAuth.currentUser ? true : false;
  }

  return (<IonApp>
    <IonReactRouter>

      {
        (isLoggedIn()) ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/" exact={true}>
                <Redirect to={pageDestinations.user.dashboard} />
              </Route>

              <Route path={pageDestinations.user.dashboard} exact={true}>
                <UserDashboardPage />
              </Route>
              <Route path={pageDestinations.user.upload} exact={true}>
                <UserPlantUploadPage />
              </Route>
              {/* <Route path={pageDestinations.user.history} exact={true}>
                <UserHistoryPage />
              </Route>
              <Route path={pageDestinations.user.account} exact={true}>
                <UserAccountPage />
              </Route> */}

              <Route>
                <Redirect to={pageDestinations.guest.home} />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href={pageDestinations.user.dashboard}>
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="upload" href={pageDestinations.user.upload}>
                <IonIcon aria-hidden="true" icon={cloudUpload} />
                <IonLabel>Upload</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="history" href={pageDestinations.user.history}>
                <IonIcon aria-hidden="true" icon={time} />
                <IonLabel>History</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href={pageDestinations.user.account}>
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Account</IonLabel>
              </IonTabButton> */}
            </IonTabBar>

          </IonTabs>
        ) : (
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={pageDestinations.guest.home} />
              </Route>

              <Route path={pageDestinations.guest.home} exact={true}>
                <GuestWelcomePage />
              </Route>
              <Route path={pageDestinations.guest.login} exact={true}>
                <GuestAuthentication section="login" />
              </Route>
              <Route path={pageDestinations.guest.register} exact={true}>
                <GuestAuthentication section="register" />
              </Route>

              {/* <Route>
                <Redirect to={pageDestinations.guest.home} />
              </Route> */}
            </IonRouterOutlet>
          </IonSplitPane>
        )
      }
    </IonReactRouter>
  </IonApp>);
};

export default App;
