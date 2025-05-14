import { IonContent, IonText } from "@ionic/react";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { API } from "../../../services/Api";
import { toast } from "react-toastify";
import LeftSideBar from "../../components/teamleader/LeftSideBar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import CsvDownloadButton from "react-json-to-csv";
import { useHistory } from "react-router";

const AddCallingData: React.FC = () => {
  const [files, setFiles] = useState<any>();

  const formData = new FormData();
  const navigate = useHistory();
  const [managerList, setmanagerList] = useState<any>([]);
  const [currentSubCategoryUID, setcurrentSubCategoryUID] = useState<any>("");
  const [subcallingList, setsubcallingList] = useState<any>([]);
  const [currentManagerUID, setcurrentManagerUID] = useState<any>("");
  const [currentCategoryUID, setcurrentCategoryUID] = useState<any>("");
  const [already_exists_people, setalready_exists_people] = useState<any>([]);
  const [users, setusers] = useState<any>([]);
  const techno_calling_admin = JSON.parse(
    localStorage.getItem("techno_calling_admin") || "{}"
  );
  const formSchema1 = Yup.object().shape({
    access_key: Yup.string(),
    manager_uid: Yup.string(),
    category_uid: Yup.string(),
    sub_category_uid: Yup.string(),
    unique_id: Yup.string().required("Unique id is required."),
    excel_file: Yup.mixed(),
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
    if (files) {
      formData.append("excel_file", files);
      formData.append("access_key", techno_calling_admin.access_key);
      formData.append("manager_uid", currentManagerUID);
      formData.append("category_uid", currentCategoryUID);
      formData.append("sub_category_uid", currentSubCategoryUID);
      formData.append("unique_id", data.unique_id);

      API.uploadFile("add/people", formData)
        .then((response: any) => {
          console.log(response.data);
          if (response.data.status == 1) {
            setValue1("unique_id", "");
            setValue1("excel_file", "");

            toast.success(response.data.message);
            setalready_exists_people(response.data.already_exists_people);
            // navigate.push("/calling-data");
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
    } else {
      toast.error("CSV file is required.");
    }
  });
  useEffect(() => {
    setValue1("access_key", techno_calling_admin.access_key);

    usersList(0);
  }, [0]);

  const usersList = (index: any) => {
    setcurrentCategoryUID("");

    const techno_calling_admin = JSON.parse(
      localStorage.getItem("techno_calling_admin") || "{}"
    );
    setcurrentManagerUID(techno_calling_admin.uid);
    setValue1("manager_uid", techno_calling_admin.uid);
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
  const onFileSelected = (event: any) => {
    const file: File = event.target.files[0];
    if (file.type == "text/csv") {
      setFiles(file);
    } else {
      setFiles("");
      toast.error("Please enter CSV file only");
    }

    // if (file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     // setfilePreview1(reader.result);
    //   };
    //   console.log(file);

    //   const formData = new FormData();
    //   formData.append("excel_file", file);
    //   console.log(formData);
    //   setValue1("excel_file", formData);
    // }
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
                      Add Calling Data{" "}
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
                  <div className="row   ">
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Unique ID
                      </label>
                      <input
                        type="text"
                        {...register1("unique_id", {
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
                          {errors1.unique_id?.message}
                        </span>
                      </IonText>
                    </div>
                    <div className="col-4 ">
                      <label className="font-18 color-white d-block  position-relative">
                        Excel File
                      </label>
                      <input
                        type="file"
                        onChange={onFileSelected}
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
                          {/* {errors1.excel_file?.message} */}
                        </span>
                      </IonText>
                    </div>
                  </div>
                )}

                {currentSubCategoryUID && (
                  <div className="row pb-3 ">
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
                {already_exists_people.length > 0 && (
                  <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2 mb-3">
                      <CsvDownloadButton
                        headers={[
                          "State",
                          "MP",
                          "District",
                          "Assembly",
                          "Block",
                          "Panchayat",
                          "Panchayat Ward",
                          "City",
                          "City Ward",
                          "Name",
                          "Fater/Husband Name",
                          "Mobile Number",
                          "Relation",
                          "Gender",
                          "EPIC",
                          "Elected Occupation",
                          "Whatsapp Number",
                          "Category",
                          "Caste",
                          "Education",
                          "Occupation",
                          "DOB",
                          "Age",
                          "Party",
                          "Influencer",
                          "Marital Status",
                          "Blood Group",
                          "HOUSE NO",
                          "Permanent Address",
                          "Email ID",
                          "Aadhar",
                          "PPP",
                          "Part No.",
                          "Voter S.No.",
                          "X Link",
                          "Facebook Link",
                          "Instagram Link",
                          "Youtube Link",
                        ]}
                        delimiter={","}
                        className="btn-wiz-fill"
                        data={already_exists_people}
                      />
                    </div>
                    <div className="col-12">
                      <table
                        style={{
                          display: "block",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>State</th>
                            <th>MP</th>
                            <th>District</th>
                            <th>Assembly</th>
                            <th>Block</th>
                            <th>Panchayat</th>
                            <th>Panchayat Ward</th>
                            <th>City</th>
                            <th>City Ward</th>
                            <th>Name</th>
                            <th>Fater/Husband Name</th>
                            <th>Mobile Number</th>
                            <th>Relation</th>
                            <th>Gender</th>
                            <th>EPIC</th>
                            <th>Elected Occupation</th>
                            <th>Whatsapp Number</th>
                            <th>Category</th>
                            <th>Caste</th>
                            <th>Education</th>
                            <th>Occupation</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Party</th>
                            <th>Influencer</th>
                            <th>Marital Status</th>
                            <th> Blood Group</th>
                            <th>HOUSE NO</th>
                            <th>Permanent Address</th>
                            <th> Email ID</th>
                            <th>Aadhar</th>
                            <th>PPP</th>
                            <th>Part No.</th>
                            <th>Voter S.No.</th>
                            <th>X Link</th>
                            <th>Facebook Link</th>
                            <th>Instagram Link</th>
                            <th> Youtube Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {already_exists_people.length > 0 &&
                            already_exists_people.map((item: any, key: any) => (
                              <tr key={key}>
                                {item.map((item2: any, key2: any) => (
                                  <td key={key2}>
                                    {item[key2] && (
                                      <p style={{ color: "#000" }}>
                                        {item[key2]}
                                      </p>
                                    )}
                                    {!item[key2] && (
                                      <p style={{ color: "#000" }}>N/A</p>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
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

export default AddCallingData;
