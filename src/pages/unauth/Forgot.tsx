import { IonContent, IonText } from "@ionic/react";
import "./Login.css";
import { API } from "../../services/Api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router";
const Forgot: React.FC = () => {
  let history = useHistory();
  const formSchema1 = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });
  const formOptions1 = { resolver: yupResolver(formSchema1) };
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = useForm(formOptions1);
  const { errors: errors1 } = formState1;
  const onSubmit1 = handleSubmit1((data: any) => {
    API.common_api("request/change/password", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          history.push("/login");
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
  const goBack = () => {
    history.push("/login");
  };
  return (
    <IonContent fullscreen>
      <div className="login_wrapper">
        <div className="login-card">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <img src={logo} className="logo-login" /> */}
                <p className="welcome-title logo-login">TechnoCalling</p>
                <p
                  className="welcome-title logo-login"
                  style={{ width: "100%" }}
                >
                  Forgot Password Request
                </p>
              </div>
              <div className="col-12 mt-4">
                <input
                  type="email"
                  {...register1("email", { required: true })}
                  placeholder="Enter email"
                  className="login_fields1"
                />

                <IonText color="danger">
                  <span
                    style={{ float: "left", color: "red", fontSize: "14px" }}
                  >
                    {errors1.email?.message}
                  </span>
                </IonText>
              </div>

              <div className="col-12 mt-3">
                <button className="btn-black" onClick={onSubmit1}>
                  Submit
                </button>
                &nbsp;
                <button className="btn-black" onClick={goBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default Forgot;
