import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/manager/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router";
import dayjs from "dayjs";
const AddCallingPitch: React.FC = () => {
  const navigate = useHistory();
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const [users, setusers] = useState<any>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateFrom, setStartDateFrom] = useState(new Date());
  const [startDateTo, setStartDateTo] = useState(new Date());
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    category_uid: Yup.string(),
    sub_category_uid: Yup.string(),
    callingpitch_name: Yup.string().required("Callingpitch name is required."),
    callingpitch_pitch: Yup.string().required("Calling pitch is required."),
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
    API.postData("add/callingpitch", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("callingpitch_name", "");
          setValue1("callingpitch_pitch", "");

          toast.success(response.data.message);
          navigate.push("/calling-pitch");
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
    setValue1("access_key", techno_calling_admin.access_key);
    usersList(0);
    setValue1("manager_uid", techno_calling_admin.uid);
  }, [0]);
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
      });
  };

  const categoryList = (e: any, index: any) => {
    setcurrentSubCategoryUID(e.target.value);

    setValue1("sub_category_uid", e.target.value);
  };
  const subcategoryList = (e: any, index: any) => {
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
                      Add Calling Pitch{" "}
                    </h2>
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
                </div>
                {currentSubCategoryUID && (
                  <div className="row pb-3  ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Callingpitch Name
                      </label>
                      <input
                        type="text"
                        {...register1("callingpitch_name", {
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
                          {errors1.callingpitch_name?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Calling Pitch
                      </label>
                      <input
                        type="text"
                        {...register1("callingpitch_pitch", {
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
                          {errors1.callingpitch_pitch?.message}
                        </span>
                      </IonText>
                    </div>
                  </div>
                )}

                {currentSubCategoryUID && (
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

export default AddCallingPitch;
