import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import "./Home.css";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/teamleader/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { close } from "ionicons/icons";
import * as Yup from "yup";
const PasswordRequest: React.FC = () => {
  const [commentList, setcommentList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const formSchema2 = Yup.object().shape({
    access_key: Yup.string(),
    request_uid: Yup.string(),
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 character long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
      ),
  });
  const formOptions2 = { resolver: yupResolver(formSchema2) };
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: formState2,
    setValue: setValue2,
    getValues: getValues2,
  } = useForm(formOptions2);
  const { errors: errors2 } = formState2;
  const onSubmit2 = handleSubmit2((data: any) => {
    API.postData("serve/change/password/request", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          toast.success(response.data.message);
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.error == "User not logged in") {
          toast.error(error.response.data.error);
        }
      });
  });
  useEffect(() => {
    callingCommentList(0);
  }, [0]);

  const [pageCount, setpageCount] = useState(0);

  const callingCommentList = (index: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/change/password/requests?page=" + index, {
      access_key: techno_calling_admin.access_key,
    })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcommentList(response.data.requests);
          const total = response.data.requests.length / 10;
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
    callingCommentList(event.selected);
  };

  const setProfile = (item: any) => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setIsOpen(true);
    setValue2("access_key", techno_calling_admin.access_key);
    setValue2("request_uid", item.uid);
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
                      Password Request{" "}
                    </h2>
                  </div>
                </div>

                <div className="row pb-5 mb-4 mt-3">
                  <div className="col-12 tab-scrl">
                    <table className="min-width-800">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Added By</th>

                          <th>Role</th>
                          <th>Added On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commentList.length == 0 && (
                          <tr>
                            <td>
                              <p className="color-white">
                                No password request found.
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
                                  {item.fname} {item.lname}
                                </p>
                              </td>

                              <td>
                                {" "}
                                <p className="color-white weight-medium font-14 m-0">
                                  {item.phone}
                                </p>{" "}
                              </td>

                              <td>
                                {" "}
                                <p className=" color-white weight-medium font-14 m-0">
                                  {item.role}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p
                                  className="color-white weight-medium font-14 m-0"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {dayjs(item.date).format(
                                    "DD-MMM-YYYY HH:mm A"
                                  )}
                                </p>{" "}
                              </td>

                              <td>
                                &nbsp;
                                <IonButton
                                  onClick={() => setProfile(item)}
                                  color={"success"}
                                  shape="round"
                                >
                                  View
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
                  Reset Password
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
              <IonCol size="12">
                <label className="font-18 color-white d-block  position-relative">
                  Password
                </label>
                <input
                  type="password"
                  {...register2("password", {
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
                    {errors2.password?.message}
                  </span>
                </IonText>
              </IonCol>
              <IonCol size="4">
                <button onClick={onSubmit2} className="btn-wiz-fill">
                  Change Password
                </button>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default PasswordRequest;
