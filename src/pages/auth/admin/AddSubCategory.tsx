import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router";
import dayjs from "dayjs";
const AddSubCategory: React.FC = () => {
  const navigate = useHistory();
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [managerList, setmanagerList] = useState<any>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateFrom, setStartDateFrom] = useState(new Date());
  const [startDateTo, setStartDateTo] = useState(new Date());
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [users, setusers] = useState<any>([]);
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    category_uid: Yup.string(),
    category_name: Yup.string().required("Category name is required."),
    category_code: Yup.string().required("Category code is required."),
    category_available_from_time: Yup.string().required(
      "Category available from_time is required."
    ),
    category_available_to_time: Yup.string().required(
      "Category available to time is required"
    ),
    category_expiry: Yup.string().required("Category expiry is required."),
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
    API.postData("add/sub/category", data)
      .then((response: any) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setValue1("category_available_from_time", "");
          setValue1("category_available_to_time", "");
          setValue1("category_code", "");
          setValue1("category_expiry", "");
          setValue1("category_name", "");

          toast.success(response.data.message);
          navigate.push("/sub-category");
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
    let today = new Date();

    setValue1("category_expiry", dayjs(today).format("YYYY-MM-DD HH:mm:ss"));
    setValue1(
      "category_available_to_time",

      dayjs(today).format("HH:mm")
    );
    setValue1(
      "category_available_from_time",

      dayjs(today).format("HH:mm")
    );
  }, [0]);
  const setDateValue = (e: any) => {
    console.log(e);
    setStartDate(e);
    let today = new Date(e);

    setValue1("category_expiry", dayjs(today).format("YYYY-MM-DD HH:mm:ss"));
  };
  const setDateValue2 = (e: any) => {
    console.log(e);
    setStartDateTo(e);
    let today = new Date(e);

    setValue1(
      "category_available_to_time",

      dayjs(today).format("HH:mm")
    );
  };
  const setDateValue3 = (e: any) => {
    console.log(e);
    setStartDateFrom(e);
    let today = new Date(e);

    setValue1(
      "category_available_from_time",

      dayjs(today).format("HH:mm")
    );
  };
  const usersList = (e: any) => {
    setcurrentManagerUID(e.target.value);
    setValue1("manager_uid", e.target.value);
    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    API.postData("get/all/category/list?page=" + 0, {
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
      });
  };
  const categoryList = (e: any) => {
    setcurrentCategoryUID(e.target.value);
    setValue1("category_uid", e.target.value);
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
                      Add Sub Category{" "}
                    </h2>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <select
                      className="rec-select2 mt-2"
                      onChange={(e) => usersList(e)}
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
                      onChange={(e) => categoryList(e)}
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
                </div>
                {currentCategoryUID && (
                  <div className="row pb-3  ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Category Name
                      </label>
                      <input
                        type="text"
                        {...register1("category_name", {
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
                          {errors1.category_name?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Category Code
                      </label>
                      <input
                        type="text"
                        {...register1("category_code", {
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
                          {errors1.category_code?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Category Available From Time
                      </label>

                      <DatePicker
                        className="rec-select2 mt-2"
                        {...register1("category_available_from_time", {
                          required: true,
                        })}
                        selected={startDateFrom}
                        onChange={(date: any) => setDateValue3(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
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
                          {errors1.category_available_from_time?.message}
                        </span>
                      </IonText>
                    </div>
                  </div>
                )}
                {currentCategoryUID && (
                  <div className="row pb-3 ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Category Available To Time
                      </label>

                      <DatePicker
                        className="rec-select2 mt-2"
                        {...register1("category_available_to_time", {
                          required: true,
                        })}
                        selected={startDateTo}
                        onChange={(date: any) => setDateValue2(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
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
                          {errors1.category_available_to_time?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Category Expiry
                      </label>

                      <DatePicker
                        showTimeSelect
                        {...register1("category_expiry", {
                          required: true,
                        })}
                        className="rec-select2 mt-2"
                        selected={startDate}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        onChange={(date: any) => setDateValue(date)}
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
                          {errors1.category_expiry?.message}
                        </span>
                      </IonText>
                    </div>
                  </div>
                )}

                {currentCategoryUID && (
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

export default AddSubCategory;
