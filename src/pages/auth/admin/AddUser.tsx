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
import { useHistory } from "react-router";
import { eye, eyeOff } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
const AddUser: React.FC = () => {
  const navigate = useHistory();
  const [userType, setuserType] = useState("");
  const [userType2, setuserType2] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [showConfirmPassword1, setShowConfirmPassword1] = useState(false);

  const [managerList, setmanagerList] = useState<any>([]);
  const [managerList2, setmanagerList2] = useState<any>([]);
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    user_type: Yup.string().required("User type is required."),
    parent_uid: Yup.string().required("Parent user is required."),
    first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required")
      .matches(emailRegex, "Email must be a valid email"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at 6 character long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
      ),
    confirm_password: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      }
    ),
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
    API.postData("add/user", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("address", "");
          setValue1("personal_number", "");
          setValue1("first_name", "");
          setValue1("last_name", "");
          setValue1("email", "");
          setValue1("phone", "");
          setValue1("whatsapp_number", "");
          setValue1("password", "");
          setValue1("user_type", "");
          setValue1("parent_uid", "");

          toast.success(response.data.message);
          navigate.push("/users");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.status == 0) {
          toast.error(error.response.data.message);
        }
      });
  });
  useEffect(() => {
    setValue1("access_key", techno_calling_admin.access_key);
  }, [0]);
  const selectUser = (e: any) => {
    if (e.target.value) {
      setValue1("personal_number", undefined);
      setuserType(e.target.value);
      if (e.target.value == "manager") {
        setValue1("parent_uid", techno_calling_admin.uid);
      } else {
        setValue1("parent_uid", "");
        setmanagerList([]);
        setmanagerList2([]);
        setuserType2("");
        managerListApi(e.target.value, "get/manager/list");
      }
    } else {
      setValue1("parent_uid", "");
      setuserType("");
      setmanagerList([]);
    }
  };
  const selectUser2 = (e: any) => {
    if (e.target.value) {
      if (userType == "teamleader") {
        setValue1("parent_uid", e.target.value);
      } else {
        setuserType2("teamleader");
        managerListApi2(e.target.value, "get/teamleader/list");
      }
    } else {
      setValue1("parent_uid", "");
      // setmanagerList([]);
    }
  };
  const managerListApi = (user_type: any, url: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData(url, {
      access_key: techno_calling_admin.access_key,
      user_type: user_type,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setmanagerList(response.data.manager_list);
        } else {
          setmanagerList([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const managerListApi2 = (user_type: any, url: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData(url, {
      access_key: techno_calling_admin.access_key,
      manager_uid: user_type,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setmanagerList2(response.data.teamleader_list);
        } else {
          setmanagerList2([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
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
                    <h2 className="welcome-title mt-4 mb-3">Add User </h2>
                  </div>
                </div>

                <div className="row pb-3  mt-3">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      User Type
                    </label>
                    <select
                      className="rec-select2 mt-2"
                      {...register1("user_type", {
                        required: true,
                      })}
                      onChange={(e) => selectUser(e)}
                    >
                      <option value="">Please select type</option>
                      <option value="manager">Manager</option>
                      <option value="teamleader">Teamleader</option>
                      <option value="caller">Caller</option>
                    </select>
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
                        {errors1.user_type?.message}
                      </span>
                    </IonText>
                  </div>
                  {userType && userType != "manager" && (
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Manager
                      </label>
                      <select
                        className="rec-select2 mt-2"
                        onChange={(e) => selectUser2(e)}
                      >
                        <option value="">Please select manager</option>
                        {managerList.length > 0 &&
                          managerList.map((item: any, key: any) => (
                            <option key={key} value={item.uid}>
                              {item.fname} {item.lname}
                            </option>
                          ))}
                      </select>
                      <br />
                      <IonText color="danger">
                        {userType && userType == "teamleader" && (
                          <span
                            style={{
                              float: "left",
                              color: "red",
                              fontSize: "14px",
                              marginTop: "10px",
                            }}
                          >
                            {errors1.parent_uid?.message}
                          </span>
                        )}
                      </IonText>
                    </div>
                  )}
                  {userType &&
                    userType == "caller" &&
                    userType2 &&
                    userType2 == "teamleader" && (
                      <div className="col-4 ">
                        <label className="font-18 color-white d-block  position-relative">
                          Teamleader
                        </label>
                        <select
                          className="rec-select2 mt-2"
                          {...register1("parent_uid", {
                            required: true,
                          })}
                        >
                          <option value="">Please select teamleader</option>
                          {managerList2.length > 0 &&
                            managerList2.map((item: any, key: any) => (
                              <option key={key} value={item.uid}>
                                {item.fname} {item.lname}
                              </option>
                            ))}
                        </select>
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
                            {errors1.parent_uid?.message}
                          </span>
                        </IonText>
                      </div>
                    )}
                </div>
                <div className="row pb-3  ">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      First Name
                    </label>
                    <input
                      onKeyPress={alphaOnlyValidation}
                      type="text"
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
                      onKeyPress={numberOnlyValidation}
                      maxLength={10}
                      type="text"
                      {...register1("whatsapp_number", {
                        required: true,
                        pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
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
                  <div className="col-4 position-relative">
                    <label className="font-18 color-white d-block position-relative">
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword1 ? "text" : "password"}
                        {...register1("password", {
                          required: true,
                        })}
                        className="rec-select2 mt-2 pr-5" 
                      />

                      {/* 👁 Toggle Button */}
                      <IonIcon
                        icon={showConfirmPassword1 ? eyeOff : eye}
                        onClick={() => setShowConfirmPassword1(!showConfirmPassword1)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "black",
                          fontSize: '20px',
                           marginTop: '4px'
                        }}
                      />
                    </div>

                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.password?.message}
                      </span>
                    </IonText>
                  </div>

                  <div className="col-4">
                    <label className="font-18 color-white d-block">Confirm Password</label>

                    <div className="position-relative ">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register1("confirm_password", {
                          required: true,
                        })}
                        className="rec-select2 mt-2 pr-5"
                      />

                      {/* Eye Icon */}
                      <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "black",
                        }}
                      >
                        <IonIcon icon={showConfirmPassword ? eyeOff : eye} style={{ fontSize: '20px', marginTop: '14px' }} />
                      </span>
                    </div>

                    {/* Error Message */}
                    <IonText color="danger">
                      <span
                        style={{
                          float: "left",
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        {errors1.confirm_password?.message}
                      </span>
                    </IonText>
                  </div>

                  {userType && userType == "caller" && (
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Personal Number
                      </label>
                      <input
                        maxLength={10}
                        {...register1("personal_number", {
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
                          {errors1.personal_number?.message}
                        </span>
                        {/* )} */}
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
                      Add
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

export default AddUser;
