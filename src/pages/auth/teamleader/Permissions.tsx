import { IonContent } from "@ionic/react";
import "./Home.css";
import LeftSideBar from "../../components/teamleader/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { API } from "../../../services/Api";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
const Permissionss: React.FC = () => {
  const [count, setcount] = useState(0);
  const [commentList, setcommentList] = useState([]);
  const [isPermissions, setisPermissions] = useState(false);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentTeamleader, setcurrentTeamleader] = useState<any>("");
  const [add_answer, setadd_answer] = useState("0");
  const [add_calling_pitch, setadd_calling_pitch] = useState("0");
  const [add_category, setadd_category] = useState("0");
  const [add_question, setadd_question] = useState("0");
  const [change_answer_status, setchange_answer_status] = useState("0");
  const [change_calling_pitch_status, setchange_calling_pitch_status] =
    useState("0");
  const [change_category_status, setchange_category_status] = useState("0");
  const [
    change_people_extra_column_status,
    setchange_people_extra_column_status,
  ] = useState("0");
  const [change_question_status, setchange_question_status] = useState("0");
  const [get_active_answer_list, setget_active_answer_list] = useState("0");
  const [get_active_calling_pitch_list, setget_active_calling_pitch_list] =
    useState("0");
  const [get_active_category_list, setget_active_category_list] = useState("0");
  const [
    get_active_people_extra_column_list,
    setget_active_people_extra_column_list,
  ] = useState("0");
  const [get_active_question_list, setget_active_question_list] = useState("0");
  const [get_all_answer_list, setget_all_answer_list] = useState("0");
  const [get_all_calling_pitch_list, setget_all_calling_pitch_list] =
    useState("0");
  const [get_all_category_list, setget_all_category_list] = useState("0");
  const [
    get_all_people_extra_column_list,
    setget_all_people_extra_column_list,
  ] = useState("0");
  const [get_all_question_list, setget_all_question_list] = useState("0");
  const [get_answer_info, setget_answer_info] = useState("0");
  const [get_calling_pitch_info, setget_calling_pitch_info] = useState("0");
  const [get_category_info, setget_category_info] = useState("0");
  const [get_question_info, setget_question_info] = useState("0");
  const [insert_people_data, setinsert_people_data] = useState("0");
  const [insert_people_extra_columns, setinsert_people_extra_columns] =
    useState("0");
  const [update_answer, setupdate_answer] = useState("0");
  const [update_calling_pitch, setupdate_calling_pitch] = useState("0");
  const [update_category, setupdate_category] = useState("0");
  const [update_people_data, setupdate_people_data] = useState("0");
  const [update_people_extra_columns, setupdate_people_extra_columns] =
    useState("0");
  const [update_question, setupdate_question] = useState("0");

  const navigate = useHistory();

  useEffect(() => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    usersList(0);
  }, [0]);

  const usersList = (index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setisPermissions(false);
    setcurrentManagerUID(techno_calling_admin.uid);
    API.postData("get/teamleader/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: techno_calling_admin.uid,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcommentList(response.data.teamleader_list);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcommentList([]);
      });
  };
  useEffect(() => {
    if (count > 0) {
      const techno_calling_admin = JSON.parse(
        localStorage.getItem("techno_calling_admin") || "{}"
      );
      API.postData("add/permissions", {
        access_key: techno_calling_admin.access_key,
        manager_uid: currentManagerUID,
        teamleader_uid: currentTeamleader,
        add_answer: add_answer,
        add_calling_pitch: add_calling_pitch,
        add_category: add_category,
        add_question: add_question,
        change_answer_status: change_answer_status,
        change_calling_pitch_status: change_calling_pitch_status,
        change_category_status: change_category_status,
        change_people_extra_column_status: change_people_extra_column_status,
        change_question_status: change_question_status,
        get_active_answer_list: get_active_answer_list,
        get_active_calling_pitch_list: get_active_calling_pitch_list,
        get_active_category_list: get_active_category_list,
        get_active_people_extra_column_list:
          get_active_people_extra_column_list,
        get_active_question_list: get_active_question_list,
        get_all_answer_list: get_all_answer_list,
        get_all_calling_pitch_list: get_all_calling_pitch_list,
        get_all_category_list: get_all_category_list,
        get_all_people_extra_column_list: get_all_people_extra_column_list,
        get_all_question_list: get_all_question_list,
        get_answer_info: get_answer_info,
        get_calling_pitch_info: get_calling_pitch_info,
        get_category_info: get_category_info,
        get_question_info: get_question_info,
        insert_people_data: insert_people_data,
        insert_people_extra_columns: insert_people_extra_columns,
        update_answer: update_answer,
        update_calling_pitch: update_calling_pitch,
        update_category: update_category,
        update_people_data: update_people_data,
        update_people_extra_columns: update_people_extra_columns,
        update_question: update_question,
      })
        .then((response: any) => {
          console.log(response.data);
          if (response.data.status == 1) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [count]);

  const changeStatus = (e: any, type: string) => {
    if (type == "add_answer") {
      setadd_answer(e.target.value);
    }
    if (type == "add_calling_pitch") {
      setadd_calling_pitch(e.target.value);
    }
    if (type == "add_category") {
      setadd_category(e.target.value);
    }
    if (type == "add_question") {
      setadd_question(e.target.value);
    }
    if (type == "change_answer_status") {
      setchange_answer_status(e.target.value);
    }
    if (type == "change_calling_pitch_status") {
      setchange_calling_pitch_status(e.target.value);
    }
    if (type == "change_category_status") {
      setchange_category_status(e.target.value);
    }
    if (type == "change_people_extra_column_status") {
      setchange_people_extra_column_status(e.target.value);
    }
    if (type == "change_question_status") {
      setchange_question_status(e.target.value);
    }
    if (type == "get_active_answer_list") {
      setget_active_answer_list(e.target.value);
    }
    if (type == "get_active_calling_pitch_list") {
      setget_active_calling_pitch_list(e.target.value);
    }
    if (type == "get_active_category_list") {
      setget_active_category_list(e.target.value);
    }
    if (type == "get_active_people_extra_column_list") {
      setget_active_people_extra_column_list(e.target.value);
    }
    if (type == "get_active_question_list") {
      setget_active_question_list(e.target.value);
    }
    if (type == "get_all_answer_list") {
      setget_all_answer_list(e.target.value);
    }
    if (type == "get_all_calling_pitch_list") {
      setget_all_calling_pitch_list(e.target.value);
    }
    if (type == "get_all_category_list") {
      setget_all_category_list(e.target.value);
    }
    if (type == "get_all_people_extra_column_list") {
      setget_all_people_extra_column_list(e.target.value);
    }
    if (type == "get_all_question_list") {
      setget_all_question_list(e.target.value);
    }
    if (type == "get_answer_info") {
      setget_answer_info(e.target.value);
    }
    if (type == "get_calling_pitch_info") {
      setget_calling_pitch_info(e.target.value);
    }
    if (type == "get_category_info") {
      setget_category_info(e.target.value);
    }
    if (type == "get_question_info") {
      setget_question_info(e.target.value);
    }
    if (type == "insert_people_data") {
      setinsert_people_data(e.target.value);
    }
    if (type == "insert_people_extra_columns") {
      setinsert_people_extra_columns(e.target.value);
    }
    if (type == "update_answer") {
      setupdate_answer(e.target.value);
    }
    if (type == "update_calling_pitch") {
      setupdate_calling_pitch(e.target.value);
    }
    if (type == "update_category") {
      setupdate_category(e.target.value);
    }
    if (type == "update_people_data") {
      setupdate_people_data(e.target.value);
    }
    if (type == "update_people_extra_columns") {
      setupdate_people_extra_columns(e.target.value);
    }
    if (type == "update_question") {
      setupdate_question(e.target.value);
    }
    setcount(count + 1);
  };
  const usersList2 = (e: any, index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setcurrentTeamleader(e.target.value);
    API.postData("get/permissions?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      teamleader_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          showData(response);
          setisPermissions(true);
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.status == 0) {
          toast.error(error.response.data.message);
          setisPermissions(false);
        }
      });
  };
  const showData = (response: any) => {
    setadd_answer(response.data.permissions.add_answer);
    setadd_calling_pitch(response.data.permissions.add_calling_pitch);
    setadd_category(response.data.permissions.add_category);
    setadd_question(response.data.permissions.add_question);
    setchange_answer_status(response.data.permissions.change_answer_status);
    setchange_calling_pitch_status(
      response.data.permissions.change_calling_pitch_status
    );
    setchange_category_status(response.data.permissions.change_category_status);
    setchange_question_status(response.data.permissions.change_question_status);
    setget_active_answer_list(response.data.permissions.get_active_answer_list);
    setget_active_calling_pitch_list(
      response.data.permissions.get_active_calling_pitch_list
    );
    setget_active_category_list(
      response.data.permissions.get_active_category_list
    );
    setget_active_question_list(
      response.data.permissions.get_active_question_list
    );
    setget_all_answer_list(response.data.permissions.get_all_answer_list);
    setget_all_calling_pitch_list(
      response.data.permissions.get_all_calling_pitch_list
    );
    setget_all_category_list(response.data.permissions.get_all_category_list);
    setget_all_question_list(response.data.permissions.get_all_question_list);
    setinsert_people_extra_columns(
      response.data.permissions.insert_people_extra_columns
    );
    setupdate_answer(response.data.permissions.update_answer);
    setupdate_calling_pitch(response.data.permissions.update_calling_pitch);
    setupdate_category(response.data.permissions.update_category);
    setupdate_people_data(response.data.permissions.update_people_data);
    setupdate_people_extra_columns(
      response.data.permissions.update_people_extra_columns
    );
    setupdate_question(response.data.permissions.update_question);
    setinsert_people_data(response.data.permissions.insert_people_data);
    setget_question_info(response.data.permissions.get_question_info);
    setget_answer_info(response.data.permissions.get_answer_info);
    setget_category_info(response.data.permissions.get_category_info);
    setget_calling_pitch_info(response.data.permissions.get_calling_pitch_info);
    setget_all_people_extra_column_list(
      response.data.permissions.get_all_people_extra_column_list
    );
    setget_active_people_extra_column_list(
      response.data.permissions.get_active_people_extra_column_list
    );
    setchange_people_extra_column_status(
      response.data.permissions.change_people_extra_column_status
    );
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
                      Permissions{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-permissions")}
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
                        &nbsp; Add Permission
                      </button>{" "}
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => usersList2(e, 0)}
                    >
                      <option value="">Please select teamleader</option>
                      {commentList.length > 0 &&
                        commentList.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.fname} {item.lname}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {!isPermissions && (
                  <div className="row pb-5 mb-4 mt-3">
                    <div className="col-12">
                      <p>No permissions found.</p>
                    </div>
                  </div>
                )}
                {isPermissions && (
                  <div className="row pb-5 mb-4 mt-3">
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Add Answer</label>
                      <select
                        value={add_answer}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "add_answer")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Add Calling Pitch</label>
                      <select
                        value={add_calling_pitch}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "add_calling_pitch")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Add Category</label>
                      <select
                        value={add_category}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "add_category")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Add Question</label>
                      <select
                        value={add_question}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "add_question")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Change Answer Status</label>
                      <select
                        value={change_answer_status}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "change_answer_status")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Change Calling Pitch Status</label>
                      <select
                        value={change_calling_pitch_status}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "change_calling_pitch_status")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Change Category Status</label>
                      <select
                        value={change_category_status}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "change_category_status")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Change People Extra Column Status</label>
                      <select
                        value={change_people_extra_column_status}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "change_people_extra_column_status")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Change Question Status</label>
                      <select
                        value={change_question_status}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "change_question_status")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Active Answer List</label>
                      <select
                        value={get_active_answer_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_active_answer_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Active Calling Pitch List</label>
                      <select
                        value={get_active_calling_pitch_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_active_calling_pitch_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Active Category List</label>
                      <select
                        value={get_active_category_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_active_category_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Active People Extra Column List</label>
                      <select
                        value={get_active_people_extra_column_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_active_people_extra_column_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Active Question List</label>
                      <select
                        value={get_active_question_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_active_question_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get All Answer List</label>
                      <select
                        value={get_all_answer_list}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "get_all_answer_list")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get All Calling Pitch List</label>
                      <select
                        value={get_all_calling_pitch_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_all_calling_pitch_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get All Category List</label>
                      <select
                        value={get_all_category_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_all_category_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get All People Extra Column List</label>
                      <select
                        value={get_all_people_extra_column_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_all_people_extra_column_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get All Question List</label>
                      <select
                        value={get_all_question_list}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_all_question_list")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Answer Info</label>
                      <select
                        value={get_answer_info}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "get_answer_info")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Calling Pitch Info</label>
                      <select
                        value={get_calling_pitch_info}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "get_calling_pitch_info")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Category Info</label>
                      <select
                        value={get_category_info}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "get_category_info")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Get Question Info</label>
                      <select
                        value={get_question_info}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "get_question_info")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Insert People Data</label>
                      <select
                        value={insert_people_data}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "insert_people_data")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Insert People Extra Columns</label>
                      <select
                        value={insert_people_extra_columns}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "insert_people_extra_columns")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update Answer</label>
                      <select
                        value={update_answer}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "update_answer")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update Calling Pitch</label>
                      <select
                        value={update_calling_pitch}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "update_calling_pitch")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update Category</label>
                      <select
                        value={update_category}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "update_category")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update People Data</label>
                      <select
                        value={update_people_data}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "update_people_data")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update People Extra Columns</label>
                      <select
                        value={update_people_extra_columns}
                        className="rec-select2 mt-2"
                        onChange={(e) =>
                          changeStatus(e, "update_people_extra_columns")
                        }
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div
                      className="col-4 mb-2
                       tab-scrl"
                    >
                      <label>Update Question</label>
                      <select
                        value={update_question}
                        className="rec-select2 mt-2"
                        onChange={(e) => changeStatus(e, "update_question")}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
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

export default Permissionss;
