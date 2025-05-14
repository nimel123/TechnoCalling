import { IonContent } from "@ionic/react";
import "./Home.css";
import HighchartsReact from "highcharts-react-official";
import LeftSideBar from "../../components/admin/LeftSideBar";
import Header from "../../components/Header";
const Home: React.FC = (props: HighchartsReact.Props) => {
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
                  <div className="col-12">
                    <h2 className="welcome-title mt-4 mb-3">Welcome</h2>
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

export default Home;
