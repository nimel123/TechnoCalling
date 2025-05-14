import { IonButton, IonContent } from "@ionic/react";
import "./Home.css";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { API } from "../../../services/Api";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const Extra: React.FC = () => {
  const [commentList, setcommentList] = useState([]);
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

  const [pageCount, setpageCount] = useState(0);

  const usersList = (e: any, index: any) => {
    setcurrentManagerUID(e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/extracolumn/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: e.target.value,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcommentList(response.data.column_list);
          const total = response.data.column_list.length / 10;
          setpageCount(total);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcommentList([]);
        setpageCount(0);
      });
  };

  const handlePageClick = (event: any) => {
    usersList(currentManagerUID, event.selected);
  };
  const changeStatus = (e: any, column_uid: any) => {
    var status = "";
    if (e.target.value == "1") {
      status = "active";
    } else {
      status = "inactive";
    }
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("change/extracolumn/status", {
      access_key: techno_calling_admin.access_key,
      manager_uid: currentManagerUID,
      column_uid: column_uid,
      status: status,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          usersList2(currentManagerUID, 0);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const usersList2 = (e: any, index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/extracolumn/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: e,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcommentList(response.data.column_list);
          const total = response.data.column_list.length / 10;
          setpageCount(total);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setcommentList([]);
        setpageCount(0);
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
                  <div className="col-6">
                    <h2 className="welcome-title mt-4 mb-3">
                      Extra Details{" "}
                      <button
                        className="outline-btn"
                        onClick={() => navigate.push("/add-extra")}
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
                        &nbsp; Add Extra
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
                </div>
                <div className="row pb-5 mb-4 mt-3">
                  <div className="col-12 tab-scrl">
                    <table className="min-width-800">
                      <thead>
                        <tr>
                          <th>Column</th>
                          <th>Added By</th>

                          <th>Role</th>
                          <th>Added On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commentList.length == 0 && (
                          <tr>
                            <td>
                              <p className="color-white">
                                No calling comments found.
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tbody>
                        {commentList.length > 0 &&
                          commentList.map((item: any, key: any) => (
                            <tr key={key} style={{ cursor: "pointer" }}>
                              <td>
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.column_name}
                                </p>
                              </td>

                              <td>
                                {" "}
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.added_by_fname} {item.added_by_lname}
                                </p>{" "}
                              </td>

                              <td>
                                {" "}
                                <p className=" color-white weight-medium font-14 m-0">
                                  {item.added_by_role}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {dayjs(item.added_on).format(
                                    "DD-MMM-YYYY HH:mm a"
                                  )}
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
                                &nbsp;
                                <IonButton
                                  onClick={() =>
                                    navigate.push(
                                      "/edit-extra/" +
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
    </IonContent>
  );
};

export default Extra;
