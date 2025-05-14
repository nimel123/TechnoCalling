import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { ToastContainer } from "react-toastify";
import Login from "./pages/unauth/Login";
import { Redirect, Route, Switch } from "react-router-dom";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./assets/main.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "react-toastify/dist/ReactToastify.css";
import "./theme/variables.css";
import AdminRoutes from "./AdminRoutes";
import ManagerRoutes from "./ManagerRoutes";
import TeamLeaderRoutes from "./TeamleaderRoutes";
import Forgot from "./pages/unauth/Forgot";

setupIonicReact({ animated: false });
const techno_calling_admin = JSON.parse(
  localStorage.getItem("techno_calling_admin") as any
);

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      {techno_calling_admin && techno_calling_admin?.role == "ADMIN" && (
        <AdminRoutes />
      )}
      {techno_calling_admin && techno_calling_admin?.role == "MANAGER" && (
        <ManagerRoutes />
      )}
      {techno_calling_admin && techno_calling_admin?.role == "TEAMLEADER" && (
        <TeamLeaderRoutes />
      )}
    </IonPage>

    {!techno_calling_admin && (
      <IonPage>
        <IonReactRouter basename="/alpha">
          <IonRouterOutlet>
            <Switch>
              <Route component={Login} path="/" exact />
              <Route component={Login} path="/login" exact />
              <Route component={Forgot} path="/forgot" exact />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route render={() => <Redirect to="/login" />} />
            </Switch>
          </IonRouterOutlet>
          <ToastContainer position="top-right" />
        </IonReactRouter>
      </IonPage>
    )}
  </IonApp>
);

export default App;
