import { IonContent } from "@ionic/react";
import "./Home.css";
import dayjs from "dayjs";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/manager/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { close } from "ionicons/icons";
const CallingData: React.FC = () => {
  const [managerList, setmanagerList] = useState<any>([]);
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const [total_people, settotal_people] = useState<any>(0);
  const [assigned_people, setassigned_people] = useState<any>(0);
  const [unassigned_people, setunassigned_people] = useState<any>(0);
  const [isPeople, setisPeople] = useState(false);
  const [currentTeamLeader, setcurrentTeamLeader] = useState<any>("");

  const [ctotal_people, setctotal_people] = useState<any>(0);
  const [cassigned_people, setcassigned_people] = useState<any>(0);
  const [cunassigned_people, setcunassigned_people] = useState<any>(0);
  const navigate = useHistory();

  useEffect(() => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    usersList(0);
  }, [0]);

  const [teamLeader, setteamLeader] = useState<any>([]);
  const [pageCount, setpageCount] = useState(0);
  const [users, setusers] = useState<any>([]);

  const subcategoryList = (e: any, index: any) => {
    setsubcallingList([]);
    setteamLeader([]);
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

  const categoryList = (e: any, index: any) => {
    setteamLeader([]);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setcurrentSubCategoryUID(e.target.value);

    API.postData("get/people/under/manager/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          settotal_people(response.data.total_people);
        } else {
          settotal_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        settotal_people(0);
      });
    API.postData("get/assigned/people/to/teamleader/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setassigned_people(response.data.assigned_people);
        } else {
          setassigned_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setassigned_people(0);
      });
    API.postData("get/unassigned/people/to/teamleader/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: currentCategoryUID,
      sub_category_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setunassigned_people(response.data.unassigned_people);
        } else {
          setunassigned_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setunassigned_people(0);
      });
    setisPeople(true);
    API.postData("get/teamleader/list??page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setteamLeader(response.data.teamleader_list);
        } else {
          setteamLeader([]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setteamLeader([]);
      });
  };
  const usersList = (index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setcurrentManagerUID(techno_calling_admin.uid);
    API.postData("get/all/category/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: techno_calling_admin.uid,
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
  const selectTeamleader = (e: any, index: any) => {
    setcurrentTeamLeader(e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );

    API.postData("get/people/under/teamleader/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      teamleader_uid: e.target.value,
      category_uid: currentCategoryUID,
      sub_category_uid: currentSubCategoryUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setctotal_people(response.data.total_people);
        } else {
          setctotal_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setctotal_people(0);
      });
    API.postData("get/assigned/people/to/caller/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      teamleader_uid: e.target.value,
      category_uid: currentCategoryUID,
      sub_category_uid: currentSubCategoryUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcassigned_people(response.data.assigned_people);
        } else {
          setcassigned_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcassigned_people(0);
      });
    API.postData("get/unassigned/people/to/caller/count?page=" + index, {
      access_key: techno_calling_admin.access_key,
      teamleader_uid: e.target.value,
      category_uid: currentCategoryUID,
      sub_category_uid: currentSubCategoryUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcunassigned_people(response.data.unassigned_people);
        } else {
          setcunassigned_people(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcunassigned_people(0);
      });
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
                  <div className="col-12">
                    <h2 className="welcome-title mt-4 mb-3">
                      Calling Data{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-calling-data")}
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
                        &nbsp; Add Calling Data
                      </button>
                      <button
                        className="outline-btn"
                        onClick={() =>
                          navigate.push("/assign-people-to-teamleader")
                        }
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
                        &nbsp; Assign People To Teamleader
                      </button>
                      <button
                        className="outline-btn"
                        onClick={() =>
                          navigate.push("/assign-people-to-caller")
                        }
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
                        &nbsp; Assign People To Caller
                      </button>
                    </h2>
                  </div>
                </div>
                <div className="row">
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
                      onChange={(e) => selectTeamleader(e, 0)}
                    >
                      <option value="">Please select teamleader</option>
                      {teamLeader.length > 0 &&
                        teamLeader.map((item: any, key: any) => (
                          <option key={key} value={item.uid}>
                            {item.fname} {item.lname}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {isPeople && (
                  <div className="card mt-3 px-3">
                    <div className="row pb-5 mb-4 mt-3">
                      <div className="col-12">
                        <h3>Get People Under Manager Count</h3>
                      </div>
                      <div className="col-2 tab-scrl">
                        <p>Total People: {total_people}</p>
                      </div>
                      <div className="col-2 tab-scrl">
                        <p>Assigned People: {assigned_people}</p>
                      </div>
                      <div className="col-3 tab-scrl">
                        <p>Unassigned People: {unassigned_people}</p>
                      </div>
                    </div>
                  </div>
                )}
                {currentTeamLeader && (
                  <div className="card mt-3 px-3">
                    <div className="row pb-5 mb-4 mt-3">
                      <div className="col-12">
                        <h3>Get People Under TeamLeader Count</h3>
                      </div>
                      <div className="col-2 tab-scrl">
                        <p>Total People: {ctotal_people}</p>
                      </div>
                      <div className="col-2 tab-scrl">
                        <p>Assigned People: {cassigned_people}</p>
                      </div>
                      <div className="col-3 tab-scrl">
                        <p>Unassigned People: {cunassigned_people}</p>
                      </div>
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

export default CallingData;
