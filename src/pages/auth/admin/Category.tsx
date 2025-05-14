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
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { close } from "ionicons/icons";
const Category: React.FC = () => {
  const [managerList, setmanagerList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
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

  const usersList = (e: any, index: any) => {
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
          const total = response.data.category_list.length / 10;
          setpageCount(total);
        } else {
          setusers([]);
          setpageCount(0);
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
  const changeStatus = (e: any, category_uid: any) => {
    var status = "";
    if (e.target.value == "1") {
      status = "active";
    } else {
      status = "inactive";
    }
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("change/category/status", {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      category_uid: category_uid,
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
  const getCatList = () => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/category/list?page=0", {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setusers(response.data.category_list);
          const total = response.data.category_list.length / 10;
          setpageCount(total);
        } else {
          setusers([]);
          setpageCount(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setusers([]);
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
                      Category{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-category")}
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
                        &nbsp; Add Category
                      </button>
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
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
                </div>

                <div className="row pb-5 mb-4 mt-3">
                  <div className="col-12 tab-scrl">
                    <table className="min-width-800">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Manager Name</th>

                          <th>Code</th>
                          {/* <th>Available From Time</th>
                          <th>Available To Time</th> */}
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length == 0 && (
                          <tr>
                            <td>
                              <p className="color-white">No category found.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tbody>
                        {users.length > 0 &&
                          users.map((item: any, key: any) => (
                            <tr key={key} style={{ cursor: "pointer" }}>
                              <td>
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.name}
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
                                  {item.code}
                                </p>{" "}
                              </td>
                              {/* <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.available_from_time}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.available_to_time}
                                </p>{" "}
                              </td> */}
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
                                      "/edit-category/" +
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
                  Category Details
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
                  Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.name}
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
                  Code
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.code}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
            {/* <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Available From Time
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.available_from_time}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Available To Time
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.available_to_time}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              
            </IonRow> */}

            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added by
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={
                    currentProfile?.added_by_fname +
                    " " +
                    currentProfile?.added_by_lname +
                    " (" +
                    currentProfile?.added_by_role +
                    ")"
                  }
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
              <IonCol size="0.2"></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default Category;
