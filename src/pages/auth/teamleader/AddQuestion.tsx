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
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
const AddQuestion: React.FC = () => {
  const navigate = useHistory();
  const [managerList, setmanagerList] = useState<any>([]);
  const [callingList, setcallingList] = useState<any>([]);
  const [questionsList, setQuestionsList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [currentCallingUID, setcurrentCallingUID] = useState<any>("");
  const [answerTypeList, setanswerTypeList] = useState<any>([]);
  const [currentAnswerUID, setCurrentAnswerUID] = useState<any>("");
  const [users, setusers] = useState<any>([]);
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    category_uid: Yup.string(),
    sub_category_uid: Yup.string(),
    callingpitch_uid: Yup.string(),
    answertype_uid: Yup.string(),
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
    API.postData("/add/question", data)
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
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setValue1("access_key", techno_calling_admin.access_key);
    getParentRole();
    API.postData("get/all/answertype/list", {
      access_key: techno_calling_admin.access_key,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setanswerTypeList(response.data.answertype_list);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [0]);
  const getParentRole = () => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    // setcurrentManagerUID(techno_calling_admin.uid);
    API.postData("get/my/parent/info", {
      access_key: techno_calling_admin.access_key,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          usersList(0, response.data.manager_info.user_uid);
          setcurrentManagerUID(response.data.manager_info.user_uid);
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const usersList = (index: any, manager_uid: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setcurrentManagerUID(manager_uid);
    setValue1("manager_uid", manager_uid);
    API.postData("get/all/category/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: manager_uid,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setusers(response.data.category_list);
        } else {
          setusers([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setusers([]);
      });
  };
  const subcategoryList = (e: any, index: any) => {
    setcurrentCategoryUID(e.target.value);
    setcallingList([]);
    // setValue1("category_uid", e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/active/sub/category/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setsubcallingList(response.data.sub_category_list);
        } else {
          setsubcallingList([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setsubcallingList([]);
      });
  };
  const categoryList = (e: any, index: any) => {
    setcurrentSubCategoryUID(e.target.value);
    // setValue1("sub_category_uid", e.target.value);
    setcallingList([]);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/callingpitch/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcallingList(response.data.callingpitch_list);
        } else {
          setcallingList([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcallingList([]);
      });
  };
  const callingPitchList = (e: any, index: any) => {
    setcurrentCallingUID(e.target.value);
    setValue1("callingpitch_uid", e.target.value);
  };
  const answerList = (e: any) => {
    setValue1("answertype_uid", e.target.value);
    setCurrentAnswerUID(e.target.value);
  };
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
                    <h2 className="welcome-title mt-4 mb-3">Add Question </h2>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => subcategoryList(e, 0)}
                    >
                      <option value="">Please select category</option>
                      {users.length > 0 &&
                        users.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.name} ({item.code})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => categoryList(e, 0)}
                    >
                      <option value="">Please select sub category</option>
                      {subcallingList.length > 0 &&
                        subcallingList.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.name} ({item.code})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => callingPitchList(e, 0)}
                    >
                      <option value="">Please select calling pitch</option>
                      {callingList.length > 0 &&
                        callingList.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => answerList(e)}
                    >
                      <option value="">Please select answer type</option>
                      {answerTypeList.length > 0 &&
                        answerTypeList.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {currentAnswerUID && currentCallingUID && (
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
                )}

                {currentAnswerUID && currentCallingUID && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default AddQuestion;
