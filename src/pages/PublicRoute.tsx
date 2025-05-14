import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  const isAuth = localStorage.getItem("money_merchant_admin_login");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
