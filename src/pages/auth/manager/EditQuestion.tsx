import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/manager/LeftSideBar";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
const EditQuestion: React.FC = () => {
  const navigate = useHistory();
  let { id, uid } = useParams<{ id?: any; uid?: any }>();
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    question_uid: Yup.string(),
    question: Yup.string().required("Question is required."),
    price: Yup.string().required("Price is required"),
  });
  const formOptions1 = { resolver: yupResolver(formSchema1) };
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
    setValue: setValue1,
  } = useForm(formOptions1);
  const { errors: errors1 } = formState1;
  const onSubmit1 = handleSubmit1((data: any) => {
    API.postData("update/question/info", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("question", "");

          toast.success(response.data.message);
          navigate.push("/question");
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
    setValue1("manager_uid", id);
    setValue1("question_uid", uid);
    API.postData("get/question/info", {
      access_key: techno_calling_admin.access_key,
      manager_uid: id,
      question_uid: uid,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("question", response.data.question_info.question);
          setValue1("price", response.data.question_info.price);
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
  }, [uid]);
  const numberOnlyValidation = (event: any) => {
    const pattern = /[0-9]/;
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
                    <h2 className="welcome-title mt-4 mb-3">Edit Question </h2>
                  </div>
                </div>

                <div className="row pb-3  ">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Question
                    </label>
                    <input
                      type="text"
                      {...register1("question", {
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
                        {errors1.question?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Price (In Rupees)
                    </label>
                    <input
                      type="text"
                      onKeyPress={numberOnlyValidation}
                      {...register1("price", {
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
                        {errors1.price?.message}
                      </span>
                    </IonText>
                  </div>
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

export default EditQuestion;
