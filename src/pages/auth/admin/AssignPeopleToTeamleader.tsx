import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const AssignPeopleToTeamleader: React.FC = () => {
  const [managerList, setmanagerList] = useState<any>([]);
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const [currentTeamLeader, setcurrentTeamLeader] = useState<any>("");
  const [unassigned_people, setunassigned_people] = useState<any>("");
  const navigate = useHistory();
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    category_uid: Yup.string(),
    sub_category_uid: Yup.string(),
    teamleader_uid: Yup.string(),
    people_count: Yup.string(),
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
    if(data.people_count===""){
      toast.error("Please Enter All Fields");
    }
    if (data.people_count > unassigned_people) {
      toast.error("You can assign maximum " + unassigned_people + " people");
    } else {
      API.uploadFile("assign/people/to/teamleader", data)
        .then((response: any) => {
          console.log(response.data);
          if (response.data.status == 1) {
            toast.success(response.data.message);
            navigate.push("/calling-data");
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
    }
  });
  useEffect(() => {
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setValue1("access_key", techno_calling_admin.access_key);
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
  const [users, setusers] = useState<any>([]);
  const [teamLeader, setteamLeader] = useState<any>([]);

  const subcategoryList = (e: any, index: any) => {
    setsubcallingList([]);
    setcurrentCategoryUID(e.target.value);
    setValue1("category_uid", e.target.value);
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
    setValue1("sub_category_uid", e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
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
          setunassigned_people("");
        }
      })
      .catch((error: any) => {
        console.log(error);
        setunassigned_people("");
      });
  };
  const usersList = (e: any, index: any) => {
    setusers([]);
    setsubcallingList([]);
    setteamLeader([]);
    setcurrentManagerUID(e.target.value);
    setValue1("manager_uid", e.target.value);
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
    API.postData("get/teamleader/list?page=" + index, {
      access_key: techno_calling_admin.access_key,
      manager_uid: e.target.value,
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
  const selectTeamleader = (e: any) => {
    setcurrentTeamLeader(e.target.value);
    setValue1("teamleader_uid", e.target.value);
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
                    <h2 className="welcome-title mt-4 mb-3">
                      Assign People To Teamleader{" "}
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
                      onChange={(e) => selectTeamleader(e)}
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

                {currentSubCategoryUID && currentTeamLeader && (
                  <div className="row pb-3 mt-3 ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        People Count 
                        <br/>
                        <span style={{fontSize:12}}>(Avaliable Peoples {unassigned_people})</span>
                      </label>
                      <input
                        type="text"
                        onKeyPress={numberOnlyValidation}
                        {...register1("people_count", {
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
                          {errors1.people_count?.message}
                        </span>
                      </IonText>
                    </div>
                  </div>
                )}

                {currentSubCategoryUID && currentTeamLeader && (
                  <div className="row pb-3 mt-2 ">
                    <div className="col-4 ">
                      <button onClick={onSubmit1} className="btn-wiz-fill">
                        Submit
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

export default AssignPeopleToTeamleader;
