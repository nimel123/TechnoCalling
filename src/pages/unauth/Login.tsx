import {
  IonContent,
  IonIcon,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Login.css";
import { eyeOff, eye } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { API } from "../../services/Api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const Login: React.FC = () => {
  const [ptype, setptype] = useState<any>("password");
  let history = useHistory();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 character long"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    // ),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = handleSubmit((data: any) => {
    API.common_api("/login", data)
      .then((response: any) => {
        if (response.data.status == 1) {
          if (response.data.role != "CALLER") {
            toast.success(response.data.message);
            localStorage.setItem(
              "techno_calling_admin",
              JSON.stringify(response.data)
            );
            window.location.reload();
          } else {
            toast.error("Please login with correct credentials");
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.status == 0) {
        }
        toast.error(error.response.data.message);
      });
  });
  return (
    <IonContent fullscreen>
      <div className="login_wrapper">
        <div className="login-card">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <img src={logo} className="logo-login" /> */}
                <p className="welcome-title logo-login">TechnoCalling</p>
                <p className="welcome-title logo-login">Login</p>
              </div>
              <div className="col-12 mt-4">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter email"
                  className="login_fields1"
                />

                <IonText color="danger">
                  <span
                    style={{ float: "left", color: "red", fontSize: "14px" }}
                  >
                    {errors.email?.message}
                  </span>
                </IonText>
              </div>
              <div className="col-12 mt-3">
                <input
                  placeholder="Enter your password"
                  className="login_fields1"
                  type={ptype}
                  {...register("password", { required: true })}
                />
                {ptype == "text" && (
                  <IonIcon
                    className="suffix-icon"
                    onClick={() => setptype("password")}
                    style={{
                      marginLeft: "-30px",
                      cursor: "pointer",
                    }}
                    color="dark"
                    icon={eyeOff}
                  ></IonIcon>
                )}
                {ptype == "password" && (
                  <IonIcon
                    className="suffix-icon"
                    style={{
                      marginLeft: "-30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setptype("text")}
                    color="dark"
                    icon={eye}
                  ></IonIcon>
                )}

                <IonText color="danger">
                  <span
                    style={{ float: "left", color: "red", fontSize: "14px" }}
                  >
                    {errors.password?.message}
                  </span>
                </IonText>
              </div>

              <div className="col-12 text-right mt-2">
                <p
                  onClick={() => history.push("/forgot")}
                  style={{ cursor: "pointer" }}
                  className="s_font black-text"
                >
                  Forgot Password?
                </p>
              </div>
              <div className="col-12">
                <button className="btn-black" onClick={onSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default Login;
