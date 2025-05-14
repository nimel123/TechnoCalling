import Users from "./pages/auth/admin/Users";
import Home from "./pages/auth/admin/Home";
import AddUser from "./pages/auth/admin/AddUser";
import EditUser from "./pages/auth/admin/EditUser";
import Category from "./pages/auth/admin/Category";
import AddCategory from "./pages/auth/admin/AddCategory";
import EditCategory from "./pages/auth/admin/EditCategory";
import CallingPitch from "./pages/auth/admin/CallingPitch";
import AddCallingPitch from "./pages/auth/admin/AddCallingPitch";
import EditCallingPitch from "./pages/auth/admin/EditCallingPitch";
import Question from "./pages/auth/admin/Question";
import AddQuestion from "./pages/auth/admin/AddQuestion";
import EditQuestion from "./pages/auth/admin/EditQuestion";
import AnswerType from "./pages/auth/admin/AnswerType";
import EditAnswerType from "./pages/auth/admin/EditAnswerType";
import AddAnswerType from "./pages/auth/admin/AddAnswerType";
import CallingComments from "./pages/auth/admin/CallingComments";
import AddCallingComment from "./pages/auth/admin/AddCallingComments";
import EditCallingComment from "./pages/auth/admin/EditCallingComment";
import Extra from "./pages/auth/admin/Extra";
import AddExtra from "./pages/auth/admin/AddExtra";
import EditExtra from "./pages/auth/admin/EditExtra";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Permissionss from "./pages/auth/admin/Permissions";
import PasswordRequest from "./pages/auth/admin/PasswordRequest";
import AddPermissions from "./pages/auth/admin/AddPermissions";
import SubCategory from "./pages/auth/admin/SubCategory";
import AddSubCategory from "./pages/auth/admin/AddSubCategory";
import EditSubCategory from "./pages/auth/admin/EditSubCategory";
import CallingData from "./pages/auth/admin/CallingData";
import AddCallingData from "./pages/auth/admin/AddCallingData";
import AssignPeopleToTeamleader from "./pages/auth/admin/AssignPeopleToTeamleader";
import AssignPeopleToCaller from "./pages/auth/admin/AssignPeopleToCaller";
import AfterCallingData from "./pages/auth/admin/AfterCallingData";
import AddAfterCallingData from "./pages/auth/admin/AddAfterCallingData";
import EditAfterCallingData from "./pages/auth/admin/EditAfterCallingData";
const AdminRoutes = () => {
  return (
    <IonReactRouter basename="/alpha">
      <IonRouterOutlet>
        <Switch>
          <Route component={Users} path="/" exact />

          <Route component={Home} path="/dashboard" exact />
          <Route component={Users} path="/users" exact />
          <Route component={AddUser} path="/add-user" exact />
          <Route component={EditUser} path="/edit-user/:id" exact />
          <Route component={AddCategory} path="/add-category" exact />
          <Route
            component={EditCategory}
            path="/edit-category/:id/:uid"
            exact
          />
          <Route component={Category} path="/category" exact />
          <Route component={SubCategory} path="/sub-category" exact />
          <Route component={AddSubCategory} path="/add-sub-category" exact />
          <Route
            component={EditSubCategory}
            path="/edit-sub-category/:id/:uid/:uuid"
            exact
          />
          <Route component={CallingPitch} path="/calling-pitch" exact />
          <Route component={AddCallingPitch} path="/add-calling-pitch" exact />
          <Route
            component={EditCallingPitch}
            path="/edit-calling-pitch/:id/:uid"
            exact
          />
          <Route
            component={AfterCallingData}
            path="/after-calling-comment"
            exact
          />
          <Route
            component={AddAfterCallingData}
            path="/add-after-calling-comment"
            exact
          />
          <Route
            component={EditAfterCallingData}
            path="/edit-after-calling-comment/:id/:uid"
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
            component={AssignPeopleToCaller}
            path="/assign-people-to-caller"
            exact
          />
          <Route component={Question} path="/question" exact />
          <Route component={AddQuestion} path="/add-question" exact />
          <Route
            component={EditQuestion}
            path="/edit-question/:id/:uid"
            exact
          />
          <Route component={AnswerType} path="/answer" exact />
          <Route component={AddAnswerType} path="/add-answer" exact />
          <Route
            component={EditAnswerType}
            path="/edit-answer/:id/:uid"
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
            path="/edit-calling-comment/:id/:uid"
            exact
          />
          <Route component={Extra} path="/extra" exact />
          <Route component={PasswordRequest} path="/password-request" exact />
          <Route component={AddExtra} path="/add-extra" exact />
          <Route component={EditExtra} path="/edit-extra/:id/:uid" exact />
          <Route component={Permissionss} path="/permissions" exact />
          <Route component={AddPermissions} path="/add-permissions" exact />
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>

          <Route render={() => <Redirect to="/users" />} />
        </Switch>
      </IonRouterOutlet>
      <ToastContainer position="top-right" />
    </IonReactRouter>
  );
};
export default AdminRoutes;
