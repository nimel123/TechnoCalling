import Users from "./pages/auth/manager/Users";
import Home from "./pages/auth/manager/Home";
import AddUser from "./pages/auth/manager/AddUser";
import EditUser from "./pages/auth/manager/EditUser";
import Category from "./pages/auth/manager/Category";
import AddCategory from "./pages/auth/manager/AddCategory";
import EditCategory from "./pages/auth/manager/EditCategory";
import CallingPitch from "./pages/auth/manager/CallingPitch";
import AddCallingPitch from "./pages/auth/manager/AddCallingPitch";
import EditCallingPitch from "./pages/auth/manager/EditCallingPitch";
import Question from "./pages/auth/manager/Question";
import AddQuestion from "./pages/auth/manager/AddQuestion";
import EditQuestion from "./pages/auth/manager/EditQuestion";
import AnswerType from "./pages/auth/manager/AnswerType";
import EditAnswerType from "./pages/auth/manager/EditAnswerType";
import AddAnswerType from "./pages/auth/manager/AddAnswerType";
import CallingComments from "./pages/auth/manager/CallingComments";
import AddCallingComment from "./pages/auth/manager/AddCallingComments";
import EditCallingComment from "./pages/auth/manager/EditCallingComment";
import Extra from "./pages/auth/manager/Extra";
import AddExtra from "./pages/auth/manager/AddExtra";
import EditExtra from "./pages/auth/manager/EditExtra";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Permissionss from "./pages/auth/manager/Permissions";
import PasswordRequest from "./pages/auth/manager/PasswordRequest";
import AddPermissions from "./pages/auth/manager/AddPermissions";
import SubCategory from "./pages/auth/manager/SubCategory";
import AddSubCategory from "./pages/auth/manager/AddSubCategory";
import EditSubCategory from "./pages/auth/manager/EditSubCategory";
import AddCallingData from "./pages/auth/manager/AddCallingData";
import AssignPeopleToTeamleader from "./pages/auth/manager/AssignPeopleToTeamleader";
import CallingData from "./pages/auth/manager/CallingData";
import AssignPeopleToCaller from "./pages/auth/manager/AssignPeopleToCaller";
import AfterCallingData from "./pages/auth/manager/AfterCallingData";
import AddAfterCallingData from "./pages/auth/manager/AddAfterCallingData";
import EditAfterCallingData from "./pages/auth/manager/EditAfterCallingData";
const ManagerRoutes = () => {
  return (
    <IonReactRouter basename="/alpha">
      <IonRouterOutlet>
        <Switch>
          <Route component={Home} path="/" exact />

          <Route component={Users} path="/users" exact />
          <Route component={AddUser} path="/add-user" exact />
          <Route component={EditUser} path="/edit-user/:id" exact />
          <Route component={AddCategory} path="/add-category/:id" exact />
          <Route
            component={EditCategory}
            path="/edit-category/:id/:uid"
            exact
          />
          <Route component={Category} path="/category" exact />
          <Route component={CallingPitch} path="/calling-pitch" exact />
          <Route component={AddCallingPitch} path="/add-calling-pitch" exact />
          <Route
            component={EditCallingPitch}
            path="/edit-calling-pitch/:id/:uid"
            exact
          />
          <Route component={CallingData} path="/calling-data" exact />
          <Route component={AddCallingData} path="/add-calling-data" exact />
          <Route
            component={EditCallingPitch}
            path="/edit-calling-data/:id/:uid"
            exact
          />
          <Route
            component={AssignPeopleToTeamleader}
            path="/assign-people-to-teamleader"
            exact
          />
          <Route
            component={AfterCallingData}
            path="/after-calling-data"
            exact
          />
          <Route
            component={AddAfterCallingData}
            path="/add-after-calling-data"
            exact
          />
          <Route
            component={EditAfterCallingData}
            path="/edit-after-calling-data/:id"
            exact
          />
          <Route
            component={AssignPeopleToCaller}
            path="/assign-people-to-caller"
            exact
          />
          <Route component={SubCategory} path="/sub-category" exact />
          <Route component={AddSubCategory} path="/add-sub-category" exact />
          <Route
            component={EditSubCategory}
            path="/edit-sub-category/:id/:uid/:uuid"
            exact
          />
          <Route component={Question} path="/question" exact />
          <Route component={AddQuestion} path="/add-question" exact />
          <Route
            component={EditQuestion}
            path="/edit-question/:id/:uid"
            exact
          />
          <Route component={AnswerType} path="/answer-type" exact />
          <Route component={AddAnswerType} path="/add-answer" exact />
          <Route component={PasswordRequest} path="/password-request" exact />
          <Route
            component={EditAnswerType}
            path="/edit-answer-type/:id/:uid"
            exact
          />
          <Route component={CallingComments} path="/calling-comments" exact />
          <Route
            component={AddCallingComment}
            path="/add-calling-comment"
            exact
          />
          <Route
            component={EditCallingComment}
            path="/edit-calling-comment/:id"
            exact
          />
          <Route component={Extra} path="/extra" exact />
          <Route component={AddExtra} path="/add-extra/:id" exact />
          <Route component={EditExtra} path="/edit-extra/:id/:uid" exact />
          <Route component={Permissionss} path="/permissions" exact />
          <Route component={AddPermissions} path="/add-permissions" exact />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </IonRouterOutlet>
      <ToastContainer position="top-right" />
    </IonReactRouter>
  );
};
export default ManagerRoutes;
