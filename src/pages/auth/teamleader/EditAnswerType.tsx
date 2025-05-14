import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/teamleader/LeftSideBar";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
const EditAnswerType: React.FC = () => {
  const navigate = useHistory();
  let { id, uid } = useParams<{ id?: any; uid?: any }>();
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    answer_uid: Yup.string(),
    answer: Yup.string().required("Answer is required."),
    answer_need_textbox: Yup.string(),
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
    API.postData("update/answer/info", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          navigate.push("/answer-type");
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
    setValue1("answer_uid", uid);
    API.postData("get/answer/info", {
      access_key: techno_calling_admin.access_key,
      manager_uid: id,
      answer_uid: uid,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("answer", response.data.answer_info.answer);
          if (response.data.answer_info.answer_need_textbox == "1") {
            setValue1("answer_need_textbox", "yes");
          } else {
            setValue1("answer_need_textbox", "no");
          }
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
                    <h2 className="welcome-title mt-4 mb-3">Edit Answer </h2>
                  </div>
                </div>

                <div className="row pb-3  ">
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Answer
                    </label>
                    <input
                      type="text"
                      {...register1("answer", {
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
                        {errors1.answer?.message}
                      </span>
                    </IonText>
                  </div>
                  <div className="col-4 ">
                    <label className="font-18 color-white d-block  position-relative">
                      Answer Need Textbox
                    </label>
                    <select
                      className="rec-select2 mt-2"
                      {...register1("answer_need_textbox", {
                        required: true,
                      })}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
                        {errors1.answer_need_textbox?.message}
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

export default EditAnswerType;
