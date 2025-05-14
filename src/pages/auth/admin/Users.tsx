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
import { useState } from "react";
import { API } from "../../../services/Api";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { close } from "ionicons/icons";
const Users: React.FC = () => {
  const navigate = useHistory();
  const [currentProfile, setcurrentProfile] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [userType, setuserType] = useState("");
  const [users, setusers] = useState<any>([]);
  const selectUser = (e: any) => {
    setusers([]);
    setpageCount(0);
    if (e.target.value) {
      setuserType(e.target.value);
      usersList(e.target.value, 0);
    } else {
      setusers([]);
      setpageCount(0);
    }
  };

  const usersList = (user_type: any, index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/user/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      user_type: user_type,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setusers(response.data.user_list.data);
          const total = response.data.user_list.total / 10;
          setpageCount(total);
        } else {
          setusers([]);
          setpageCount(0);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const handlePageClick = (event: any) => {
    usersList(userType, event.selected);
  };
  const changeStatus = (e: any, user_uid: any) => {
    console.log(e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("change/user/status", {
      access_key: techno_calling_admin.access_key,
      user_uid: user_uid,
      status: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          usersList(userType, 0);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
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
                      Users{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-user")}
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
                        &nbsp; Add User
                      </button>
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 col-sm-4">
                    <select
                      className="rec-select mt-2"
                      onChange={(e) => selectUser(e)}
                    >
                      <option value="">Please select type</option>
                      <option value="manager">Manager</option>
                      <option value="teamleader">Teamleader</option>
                      <option value="caller">Caller</option>
                    </select>
                  </div>
                </div>

                <div className="row pb-5 mb-4 mt-3">
                  <div className="col-12 tab-scrl">
                    <table className="min-width-800">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Role</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          {userType == "caller" && <th>Commission</th>}
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length == 0 && (
                          <tr>
                            <td>
                              <p className="color-white">No users found.</p>
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
                                  {item.fname}
                                </p>
                              </td>

                              <td>
                                {" "}
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.lname}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.role}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p className=" color-white weight-medium font-14 m-0">
                                  {item.email}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.phone}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.address}
                                </p>{" "}
                              </td>
                              {userType == "caller" && (
                                <td>
                                  {" "}
                                  <p
                                    className="color-white weight-medium font-14 m-0"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {item.percentage}%
                                  </p>{" "}
                                </td>
                              )}
                              <td>
                                <select
                                  value={item.status}
                                  className="rec-select mt-2 "
                                  style={{ fontWeight: "bold" }}
                                  onChange={(e) => changeStatus(e, item.uid)}
                                >
                                  <option value="ACTIVE">Active</option>
                                  <option value="INACTIVE">Inactive</option>
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
                                    navigate.push("/edit-user/" + item.uid)
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
                  User Profile
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
                  First Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.fname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Last Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.lname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Email
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.email}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Role
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.role}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Phone
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.phone}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Address
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.address}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              {currentProfile?.role == "CALLER" && (
                <>
                  <IonCol size="3.8">
                    <label className="font-18 color-white d-block  position-relative">
                      Personal Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      defaultValue={currentProfile?.personal_number}
                      className="rec-select2 mt-2"
                    />
                  </IonCol>
                  <IonCol size="0.2"></IonCol>
                </>
              )}

              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Whatsapp Number
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.whatsapp_number}
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
                  defaultValue={currentProfile?.status}
                  className="rec-select2 mt-2"
                />
              </IonCol>
            </IonRow>

            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Parent First Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.parent_fname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Parent Last Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.parent_lname}
                  className="rec-select2 mt-2"
                />
              </IonCol>
              <IonCol size="0.2"></IonCol>
              <IonCol size="4">
                <label className="font-18 color-white d-block  position-relative">
                  Parent Role
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={currentProfile?.parent_role}
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
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default Users;
