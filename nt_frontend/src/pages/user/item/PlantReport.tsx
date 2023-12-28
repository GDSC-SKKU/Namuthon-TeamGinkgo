import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonIcon, IonItem, IonLabel, IonNote, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from "@ionic/react";
import { airplane, information, informationCircle, medkit, medkitOutline, warning } from "ionicons/icons";
import { PlanetAnalyzationResponse } from "../../../data/apiStandard";

interface PlanetHealthStatus {
    status: "normal" | "light" | "warning" | "danger";
}

interface ContainerProps {
    plantAnalyzationData: PlanetAnalyzationResponse;
    plantImageSrc: string;
}

const Page: React.FC<ContainerProps> = ({plantAnalyzationData, plantImageSrc}) => {

    // const demoData: PlanetAnalyzationResponse = {
    //     name: "바질",
    //     accuracy: 0.9,
    //     disease: [{"name": "딸기잿빛곰팡이병", "type": "light"}],
    //     information: {"toxicity": "무독성", "invasive": "침입성으로 보고되지 않음", "type": "허브", "life": "다년생", "cultivation": "가을, 봄"}
    // };

    //const planetImageSrc: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK55Rxdrg6kRg7vAonFRCZtg7iSs78AYgYPdk9K6JgmQ&s";
    //const planetAnalyzationData: PlanetAnalyzationResponse = demoData;

    function getPlanetHealthStatus(analyzation: PlanetAnalyzationResponse): PlanetHealthStatus {
        let status: "normal" | "light" | "warning" | "danger" = "normal";

        let light = 0;
        let warning = 0;
        let danger = 0;
        analyzation.disease.forEach((disease) => {
            switch (disease.type) {
                case "light":
                    light++;
                    break;
                case "warning":
                    warning++;
                    break;
                case "danger":
                    danger++;
                    break;
            }
        });
        if (danger > 0) {
            status = "danger";
        }
        else if (warning > 0) {
            status = "warning";
        }
        else if (light > 0) {
            status = "light";
        }

        return { status: status };
    }
    const planetHealthStatus: PlanetHealthStatus = getPlanetHealthStatus(plantAnalyzationData);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Result</IonTitle>
                </IonToolbar>
                <IonSegment value="default" style={{backgroundColor: "white"}}>
                    <IonSegmentButton value="default">
                        <IonLabel>기본 정보</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="manage">
                        <IonLabel>관리</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="culture">
                        <IonLabel>문화</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonHeader>
            <IonContent fullscreen>

                <div style={{textAlign: "right", marginRight: "12px", marginTop: "12px"}}>
                    <IonText color="medium">Accuracy: { (plantAnalyzationData.accuracy * 100).toFixed(2) }%</IonText>
                </div>

                <IonCard>
                    <img src={plantImageSrc} />
                    <IonCardHeader>
                        <IonCardTitle>{plantAnalyzationData.name}</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                <IonList inset={true}>
                    <IonItem lines="none">
                        <IonIcon color={
                            (planetHealthStatus.status === "normal") ? "success" :
                            (planetHealthStatus.status === "light") ? "warning" :
                            (planetHealthStatus.status === "warning") ? "danger" :
                            (planetHealthStatus.status === "danger") ? "danger" : "success"
                        } slot="start" icon={(planetHealthStatus.status === "danger") ? warning : medkit} size="large"></IonIcon>
                        <IonLabel><strong>건강 상태</strong></IonLabel>
                        {/* <IonNote slot="end">6</IonNote> */}
                    </IonItem>
                    <IonItem>
                        {
                            (planetHealthStatus.status === "normal") ? "건강해요!" :
                            (planetHealthStatus.status === "light") ? "약간의 질병이 있어요!" :
                            (planetHealthStatus.status === "warning") ? "주의해야 할 질병이 있어요!" :
                            (planetHealthStatus.status === "danger") ? "매우 위험한 질병이 있어요!" : "Error"
                        }
                    </IonItem>
                    {
                        plantAnalyzationData.disease.map((disease) => {
                            return (
                                <IonItem>
                                    <IonLabel color="medium">{disease.name}</IonLabel>
                                    <IonNote slot="end">{
                                        (disease.type === "light") ? "초기" :
                                        (disease.type === "warning") ? "중기" :
                                        (disease.type === "danger") ? "말기" : "Error"
                                    }</IonNote>
                                </IonItem>
                            );
                        })
                    }
                </IonList>

                <IonList inset={true}>
                    <IonItem lines="none">
                        <IonIcon slot="start" icon={informationCircle} size="large"></IonIcon>
                        <IonLabel><strong>주요 사실</strong></IonLabel>
                    </IonItem>
                    {
                        Object.keys(plantAnalyzationData.information).map((key) => {
                            return (
                                <IonItem>
                                    <IonLabel>{key}</IonLabel>
                                    <IonNote slot="end">{plantAnalyzationData.information[key]}</IonNote>
                                </IonItem>
                            );
                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
};

export default Page;