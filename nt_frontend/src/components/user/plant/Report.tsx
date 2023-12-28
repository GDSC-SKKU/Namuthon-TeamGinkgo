import { useIonAlert, IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { PlanetAnalyzationResponse } from "../../../data/apiStandard";
import { warning, medkit, informationCircle } from "ionicons/icons";

interface PlanetHealthStatus {
    status: "normal" | "light" | "warning" | "danger";
}

interface ContainerProps {
    plantAnalyzationData: PlanetAnalyzationResponse;
    plantImageSrc: string;
}

export function getPlanetHealthStatus(analyzation: PlanetAnalyzationResponse): PlanetHealthStatus {
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

const PlantReportComponent: React.FC<ContainerProps> = ({plantAnalyzationData, plantImageSrc}) => {

    const planetHealthStatus: PlanetHealthStatus = getPlanetHealthStatus(plantAnalyzationData);

    return (<>
        <div style={{textAlign: "right", marginRight: "12px", marginTop: "12px"}}>
            <IonText color="medium">{plantAnalyzationData.name} (Accuracy: { (plantAnalyzationData.accuracy * 100).toFixed(2) }%)</IonText>
        </div>

        <div style={{
            backgroundImage: `url(${plantImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "256px"
        }}></div>

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
                        <IonItem key={disease.name}>
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
    </>)
};

export default PlantReportComponent;