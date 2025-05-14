import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/manager/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
const Home: React.FC = () => {
  const [userType, setuserType] = useState("");
  const navigate = useHistory();

  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    user_uid: Yup.string(),
    fname: Yup.string().required("First name is required."),
    lname: Yup.string().required("Last name is required."),
    email: Yup.string(),

    phone: Yup.string(),
    whatsapp_number: Yup.string(),
    address: Yup.string().required("Address is required."),
    personal_number: Yup.string(),
  });
  const formOptions1 = { resolver: yupResolver(formSchema1) };
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
    setValue: setValue1,
    getValues: getValues1,
  } = useForm(formOptions1);
  const { errors: errors1 } = formState1;
  const onSubmit1 = handleSubmit1((data: any) => {
    API.postData("update/profile", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          window.location.reload();
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

    API.postData("get/profile", {
      access_key: techno_calling_admin.access_key,
      user_uid: techno_calling_admin.uid,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("access_key", techno_calling_admin.access_key);
          setValue1("user_uid", techno_calling_admin.uid);
          setValue1("fname", response.data.user_information.fname);
          setValue1("lname", response.data.user_information.lname);
          setValue1("email", response.data.user_information.email);
          setValue1("phone", response.data.user_information.phone);
          setValue1(
            "whatsapp_number",
            response.data.user_information.whatsappnumber
          );
          setValue1("address", response.data.user_information.address);
          if (response.data.user_information.personalnumber) {
            setValue1(
              "personal_number",
              response.data.user_information.personalnumber
            );
          }

          if (response.data.user_information.role_name == "CALLER") {
            setuserType("caller");
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [0]);
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
                <div className="card px-3 py-2 mt-3">
                  <div className="row">
                    <div className="col-6">
                      <h2 className="welcome-title mt-4 mb-3">
                        Update Profile{" "}
                      </h2>
                    </div>
                  </div>

                  <div className="row pb-3  ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        First Name
                      </label>
                      <input
                        onKeyPress={alphaOnlyValidation}
                        type="text"
                        {...register1("fname", {
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
                          {errors1.fname?.message}
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
                        {...register1("lname", {
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
                          {errors1.lname?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Address
                      </label>
                      <input
                        type="text"
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
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        readOnly
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
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Whatsapp Number
                      </label>
                      <input
                        type="number"
                        readOnly
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
                        readOnly
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
                  </div>
                  <div className="row pb-3 ">
                    {userType && userType == "caller" && (
                      <div className="col-4 ">
                        <label className="font-18 color-white d-block  position-relative">
                          Personal Number
                        </label>
                        <input
                          readOnly
                          {...register1("personal_number", {
                            required: true,
                          })}
                          type="number"
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
                  </div>
                  <div className="row pb-3 mt-2 ">
                    <div className="col-6 ">
                      <button onClick={onSubmit1} className="btn-wiz-fill">
                        Update
                      </button>{" "}
                    </div>
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

export default Home;
