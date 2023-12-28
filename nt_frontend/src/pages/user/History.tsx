import { getAuth, signOut } from "firebase/auth";
import pageDestinations from "../../data/pageDestinations";
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { arrowBack, logOutOutline } from "ionicons/icons";
import { useUserDataStorage } from "../../data/localStorage";
import { useState } from "react";
import { PlanetAnalyzationResponse } from "../../data/apiStandard";
import PlantReportComponent from "../../components/user/plant/Report";

interface ContainerProps {
}

const Page: React.FC<ContainerProps> = ({}) => {
    
    const router = useIonRouter();
    
    const [history, setHistory] = useUserDataStorage.plantAnalyzationHistory();
    const [currentView, setCurrentView] = useState<{data: PlanetAnalyzationResponse, base64Image: string} | null>(null);

    return (<IonPage>
        <IonHeader>
            {(currentView === null) ? (
                <IonToolbar>
                    <IonTitle>History</IonTitle>
                </IonToolbar>
            ) : (
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => {setCurrentView(null)}}>
                            <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{currentView.data.name}</IonTitle>
                </IonToolbar>
            )}
        </IonHeader>
        <IonContent fullscreen>
            {
                (currentView === null) ? (
                    <IonList inset={true}>
                        {
                            (history.length > 0) ? (
                                history.map((analyzation, index) => {
                                    return (
                                        <IonItem key={index} button={true} onClick={() => {
                                            setCurrentView({data: analyzation.data, base64Image: analyzation.base64Image});
                                        }}>
                                            <IonAvatar aria-hidden="true" slot="start">
                                                <img src={analyzation.base64Image} />
                                            </IonAvatar>
                                            <IonLabel>{analyzation.data.name}</IonLabel>
                                            <IonNote slot="end">{analyzation.timestamp.toLocaleString()}</IonNote>
                                        </IonItem>
                                    )
                                })
                            ) : (
                                <IonItem>
                                    <IonLabel>No history</IonLabel>
                                </IonItem>
                            )
                        }
                    </IonList>
                ) : (
                    <PlantReportComponent
                        plantImageSrc={currentView.base64Image as string}
                        plantAnalyzationData={currentView.data}
                    />
                )
            }
        </IonContent>
    </IonPage>);
}

export default Page;