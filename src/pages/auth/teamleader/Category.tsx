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
import LeftSideBar from "../../components/teamleader/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { API } from "../../../services/Api";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { close } from "ionicons/icons";
const Category: React.FC = () => {
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const navigate = useHistory();

  useEffect(() => {
    getParentRole();
  }, [0]);

  const [currentProfile, setcurrentProfile] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [users, setusers] = useState<any>([]);
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
    setcurrentManagerUID(techno_calling_admin.uid);
    API.postData("get/all/category/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: manager_uid,
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
        toast.error(error.response.data.message);
        setusers([]);
        setpageCount(0);
      });
  };
  const handlePageClick = (event: any) => {
    usersList(event.selected, currentManagerUID);
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
        toast.error(error.response.data.message);
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
                      {currentManagerUID && (
                        <button
                          className="outline-btn"
                          onClick={() =>
                            navigate.push("/add-category/" + currentManagerUID)
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
                          &nbsp; Add Category
                        </button>
                      )}
                    </h2>
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

            <IonRow style={{ padding: "10px" }}>
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added By
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
              <IonCol size="3.8">
                <label className="font-18 color-white d-block  position-relative">
                  Added On
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
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default Category;
