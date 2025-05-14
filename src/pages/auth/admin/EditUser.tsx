import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
const EditUser: React.FC = () => {
  let { id } = useParams<{ id?: any }>();
  const [userType, setuserType] = useState("");
  const navigate = useHistory();
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    user_uid: Yup.string(),
    first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required")
      .matches(emailRegex, "Email must be a valid email"),

    phone: Yup.string()
      .required("Phone is required.")
      .min(10, "Phone must be 10 digit.")
      .max(10, "Phone must be 10 digit."),
    whatsapp_number: Yup.string()
      .required("Whatsapp number is required.")
      .min(10, "Phone must be 10 digit.")
      .max(10, "Phone must be 10 digit."),
    address: Yup.string().required("Address is required."),
    personal_number: Yup.string()
      .min(10, "Phone must be 10 digit.")
      .max(10, "Phone must be 10 digit."),
    percentage: Yup.string(),
  });
  const formOptions1 = { resolver: yupResolver(formSchema1) };
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
    setValue: setValue1,
    getValues,
  } = useForm(formOptions1);
  const { errors: errors1 } = formState1;
  const onSubmit1 = handleSubmit1((data: any) => {
    API.postData("update/user/profile", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          //   setValue1("address", "");
          //   setValue1("personal_number", "");
          //   setValue1("first_name", "");
          //   setValue1("last_name", "");
          //   setValue1("email", "");
          //   setValue1("phone", "");
          //   setValue1("whatsapp_number", "");

          toast.success(response.data.message);
          navigate.push("/users");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });

  useEffect(() => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );

    API.postData("get/user/profile", {
      access_key: techno_calling_admin.access_key,
      user_uid: id,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("access_key", techno_calling_admin.access_key);
          setValue1("user_uid", id);
          setValue1("first_name", response.data.user_profile.fname);
          setValue1("last_name", response.data.user_profile.lname);
          setValue1("email", response.data.user_profile.email);
          setValue1("phone", response.data.user_profile.phone);
          setValue1(
            "whatsapp_number",
            response.data.user_profile.whatsappnumber
          );
          setValue1("address", response.data.user_profile.address);
          if (response.data.user_profile.personalnumber) {
            setValue1(
              "personal_number",
              response.data.user_profile.personalnumber
            );
          }
          if (response.data.user_profile.percentage) {
            setValue1("percentage", response.data.user_profile.percentage);
          } else {
            setValue1("percentage", "0");
          }

          if (response.data.user_profile.role_name == "CALLER") {
            setuserType("caller");
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [id]);
  const numberOnlyValidation = (event: any) => {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  };
  const alphaOnlyValidation = (event: any) => {
    const pattern = /^[a-zA-Z]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  };
  return (
    <IonContent fullscreen>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12 padding-left-275 pr-0">
            <LeftSideBar />

            <div className="containt-area">
              <div className="top-strip d-flex ">
                <div className="d-flex align-items-center">
                  <Header />
                </div>
              </div>

              <div className="container-fluid px-4">
                <div className="row">
                  <div className="col-6">
                    <h2 className="welcome-title mt-4 mb-3">Edit User </h2>
                  </div>
                </div>

                <div className="row pb-3  ">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      First Name
                    </label>
                    <input
                      type="text"
                      onKeyPress={alphaOnlyValidation}
                      {...register1("first_name", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.first_name?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Last Name
                    </label>
                    <input
                      onKeyPress={alphaOnlyValidation}
                      type="text"
                      {...register1("last_name", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.last_name?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Phone Number
                    </label>
                    <input
                      onKeyPress={numberOnlyValidation}
                      type="text"
                      maxLength={10}
                      {...register1("phone", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.phone?.message}
                      </span>
                    </IonText>
                  </div>
                </div>
                <div className="row pb-3 ">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Whatsapp Number
                    </label>
                    <input
                      maxLength={10}
                      onKeyPress={numberOnlyValidation}
                      type="text"
                      {...register1("whatsapp_number", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.whatsapp_number?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register1("email", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.email?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Address
                    </label>
                    <textarea
                      {...register1("address", {
                        required: true,
                      })}
                      className="rec-select2 mt-2"
                    />
                    <br />
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.address?.message}
                      </span>
                    </IonText>
                  </div>
                </div>
                <div className="row pb-3 ">
                  {userType && userType == "caller" && (
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Personal Number
                      </label>
                      <input
                        maxLength={10}
                        {...register1("personal_number", {
                          required: true,
                        })}
                        onKeyPress={numberOnlyValidation}
                        type="text"
                        className="rec-select2 mt-2"
                      />
                      <br />
                      <IonText color="danger">
                        <span
                          style={{
                            float: "left",
                            color: "red",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          {errors1.personal_number?.message}
                        </span>
                      </IonText>
                    </div>
                  )}
                  {userType && userType == "caller" && (
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Commission
                      </label>
                      <input
                        maxLength={10}
                        {...register1("percentage", {
                          required: true,
                          pattern: /[0-9]+/,
                        })}
                        onKeyPress={numberOnlyValidation}
                        type="text"
                        className="rec-select2 mt-2"
                      />
                      <br />
                      <IonText color="danger">
                        {/* {userType == "caller" &&
                          !getValues("personal_number") && ( */}
                        <span
                          style={{
                            float: "left",
                            color: "red",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          {errors1.percentage?.message}
                        </span>
                        {/* )} */}
                      </IonText>
                    </div>
                  )}
                </div>
                <div className="row pb-3 mt-2 ">
                  <div className="col-4 ">
                    <button onClick={onSubmit1} className="btn-wiz-fill">
                      Update
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => navigate.goBack()}
                      className="btn-wiz-fill"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default EditUser;
