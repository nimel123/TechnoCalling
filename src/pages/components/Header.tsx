import { IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { API } from "../../services/Api";
interface ContainerProps {}
const Header: React.FC<ContainerProps> = () => {
  const history = useHistory();
  const goTransfer = (e: any) => {
    history.goBack();
  };

  useEffect(() => {
    setInterval(() => {
      const techno_calling_admin = localStorage.getItem("techno_calling_admin");
      if (!techno_calling_admin) {
        localStorage.removeItem("techno_calling_admin");
        window.location.reload();
      }
    }, 1000);
    // const techno_calling_admin = JSON.parse(
    //   localStorage.getItem("techno_calling_admin") || "{}"
    // );
    // if (techno_calling_admin.role == "TEAMLEADER") {
    //   API.postData("get/my/permissions", {
    //     access_key: techno_calling_admin.access_key,
    //   })
    //     .then((response1: any) => {
    //       console.log(response1.data);
    //     })
    //     .catch((error: any) => {
    //       console.log(error.response.data.message);
    //     });
    // }
  }, [0]);

  return (
    <>
      <IonIcon
        style={{ cursor: "pointer" }}
        onClick={goTransfer}
        icon={chevronBack}
        size="large"
      ></IonIcon>
      <p onClick={goTransfer} style={{ marginBottom: "0" }}>
        &nbsp;Back
      </p>
    </>
  );
};

export default Header;
