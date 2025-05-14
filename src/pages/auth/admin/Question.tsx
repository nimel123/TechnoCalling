import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
} from "@ionic/react";
import "./Home.css";
import dayjs from "dayjs";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { API } from "../../../services/Api";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { close } from "ionicons/icons";
const Question: React.FC = () => {
  const [managerList, setmanagerList] = useState<any>([]);
  const [callingList, setcallingList] = useState<any>([]);
  const [questionsList, setQuestionsList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [currentCallingUID, setcurrentCallingUID] = useState<any>("");
  const [answerTypeList, setanswerTypeList] = useState<any>([]);
  const [currentAnswerUID, setCurrentAnswerUID] = useState<any>("");
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const navigate = useHistory();

  useEffect(() => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/manager/list", {
      access_key: techno_calling_admin.access_key,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setmanagerList(response.data.manager_list);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
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

  const [currentProfile, setcurrentProfile] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [userType, setuserType] = useState("");
  const [users, setusers] = useState<any>([]);
  const selectUser = (e: any) => {
    if (e.target.value) {
      setuserType(e.target.value);
      usersList(e.target.value, 0);
    } else {
      setusers([]);
      setpageCount(0);
    }
  };
  const categoryList = (e: any, index: any) => {
    setcurrentSubCategoryUID(e.target.value);
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
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/question/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: currentSubCategoryUID,
      callingpitch_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setQuestionsList(response.data.question_list);
          const total = response.data.question_list.length / 10;
          setpageCount(total);
        } else {
          setQuestionsList([]);
          setpageCount(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setQuestionsList([]);
        setpageCount(0);
      });
  };
  const answerList = (e: any) => {
    setCurrentAnswerUID(e.target.value);
  };
  const usersList = (e: any, index: any) => {
    setusers([]);
    setsubcallingList([]);
    setcallingList([]);
    setcurrentManagerUID(e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/category/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: e.target.value,
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
        setpageCount(0);
      });
  };

  const handlePageClick = (event: any) => {
    usersList(userType, event.selected);
  };
  const changeStatus = (e: any, question_uid: any) => {
    var status = "";
    if (e.target.value == "1") {
      status = "active";
    } else {
      status = "inactive";
    }
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("change/question/status", {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      question_uid: question_uid,
      status: status,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          getCatList();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const subcategoryList = (e: any, index: any) => {
    setsubcallingList([]);
    setcallingList([]);
    setcurrentCategoryUID(e.target.value);
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
  const getCatList = () => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/question/list?page=0", {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: currentSubCategoryUID,
      callingpitch_uid: currentCallingUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setQuestionsList(response.data.question_list);
          const total = response.data.question_list.length / 10;
          setpageCount(total);
        } else {
          setQuestionsList([]);
          setpageCount(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setQuestionsList([]);
        setpageCount(0);
      });
  };
  const setProfile = (item: any) => {
    setIsOpen(true);
    setcurrentProfile(item);
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
                    <h2 className="welcome-title mt-4 mb-3">
                      Questions{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-question")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-plus"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>{" "}
                        &nbsp; Add Question
                      </button>
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => usersList(e, 0)}
                    >
                      <option value="">Please select manager</option>
                      {managerList.length > 0 &&
                        managerList.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.fname} {item.lname}
                          </option>
                        ))}
                    </select>
                  </div>
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
                  {/* <div className="col-3">
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
                  </div> */}
                </div>

                <div className="row pb-5 mb-4 mt-3">
                  <div className="col-12 tab-scrl">
                    <table className="min-width-800">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Price (In Rupees)</th>
                          <th>Manager Name</th>

                          <th>Answer Type</th>
                          <th>Callingpitch Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questionsList.length == 0 && (
                          <tr>
                            <td>
                              <p className="color-white">No questions found.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tbody>
                        {questionsList.length > 0 &&
                          questionsList.map((item: any, key: any) => (
                            <tr key={key} style={{ cursor: "pointer" }}>
                              <td>
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.question}
                                </p>
                              </td>
                              <td>
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.price}
                                </p>
                              </td>
                              <td>
                                {" "}
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.manager_fname} {item.manager_lname}
                                </p>{" "}
                              </td>

                              <td>
                                {" "}
                                <p className=" color-white weight-medium font-14 m-0">
                                  {item.answer_type}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.callingpitch_name}
                                </p>{" "}
                              </td>

                              <td>
                                <select
                                  value={item.status}
                                  className="rec-select mt-2 "
                                  style={{ fontWeight: "bold" }}
                                  onChange={(e) => changeStatus(e, item.uid)}
                                >
                                  <option value="1">Active</option>
                                  <option value="0">Inactive</option>
                                </select>
                              </td>
                              <td>
                                <IonButton
                                  onClick={() => setProfile(item)}
                                  color={"success"}
                                  shape="round"
                                >
                                  View
                                </IonButton>
                                &nbsp;
                                <IonButton
                                  onClick={() =>
                                    navigate.push(
                                      "/edit-question/" +
                                        currentManagerUID +
                                        "/" +
                                        item.uid
                                    )
                                  }
                                  color={"success"}
                                  shape="round"
                                >
                                  Edit
                                </IonButton>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <br />

                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ReactPaginate
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      nextLabel="Next"
                      onPageChange={handlePageClick}
                      pageCount={pageCount}
                      previousLabel="Previous"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IonModal
        onWillDismiss={() => setIsOpen(false)}
        isOpen={isOpen}
        style={{
          "--border-radius": "20px",
          "--width": "1080px",
          "--height": "700px",
        }}
      >
        <IonContent className="ion-padding">
          <IonGrid fixed>
            <IonRow style={{ padding: "10px" }}>
              <IonCol size="11">
                <label
                  className="color-white d-block  position-relative"
                  style={{ fontSize: "22px", fontWeight: "bold" }}
                >
                  Question Details
                </label>
              </IonCol>
              <IonCol size="1">
                <IonIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsOpen(false)}
                  size="large"
                  icon={close}
                ></IonIcon>
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Question
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.question}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Manager Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={
                    currentProfile?.manager_fname +
                    " " +
                    currentProfile?.manager_lname
                  }
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Answer Type
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.answer_type}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Callingpitch Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.callingpitch_name}
                  className="rec-select2 mt-2"
                />
              </IonCol>

              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Status
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={
                    currentProfile?.status == "1" ? "Active" : "Inactive"
                  }
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>

            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added First Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.added_by_fname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added Last Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.added_by_lname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Added Role
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.added_by_role}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added Date
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={dayjs(currentProfile?.added_on).format(
                    "MMMM DD, YYYY hh:mm A"
                  )}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Expiry
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={dayjs(currentProfile?.expiry).format(
                    "MMMM DD, YYYY hh:mm A"
                  )}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default Question;
