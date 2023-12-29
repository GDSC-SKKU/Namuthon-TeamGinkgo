import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonAlert, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { useState } from "react";
import { PlanetAnalyzationRequest, PlanetAnalyzationResponse, backendUrl } from "../../data/apiStandard";
import { useUserDataStorage } from "../../data/localStorage";
import PlantUploadComponent from "../../components/user/plant/Upload";
import PlantReportComponent from "../../components/user/plant/Report";
import { FullScreenLoadingComponent } from "../../components/Loading";
import { arrowBack } from "ionicons/icons";


interface ContainerProps {

};

const Page: React.FC<ContainerProps> = ({}) => {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [plantAnalyzationData, setAnalyzationData] = useState<PlanetAnalyzationResponse | null>(null);
    const [plantAnalyzationHistory, setPlantAnalyzationHistory] = useUserDataStorage.plantAnalyzationHistory();

    const [fetchStateAlert] = useIonAlert();

    function getImageUploadSrc(file: File): string {
        return URL.createObjectURL(file);
    }

    function onImageUpload(file: File) {
        setImageUpload(file);
        requestPlantAnalyzation(file);
    }

    function onSuccessfulFetch(base64Image: string, data: PlanetAnalyzationResponse) {
        setAnalyzationData(data);
        setPlantAnalyzationHistory([...plantAnalyzationHistory, {
            timestamp: new Date(),
            base64Image: base64Image,
            data: data
        }]);
    }

    function requestPlantAnalyzation(file: File) {
        // convert image file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;

            const body: PlanetAnalyzationRequest = {
                base64Image: base64Image as string,
            };
            fetch(backendUrl.plantAnalyzation, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }).then((response) => {
                response.json().then((data: PlanetAnalyzationResponse) => {
                    onSuccessfulFetch(base64Image as string, data);
                });
            }).catch((error) => {
                showError(String(error));
                resetState();
            });
        };
        reader.onerror = (error) => {
            showError(String(error));
            resetState();
        };
    };
    
    function showError(errorMessage: string, errorTitle?: string) {
        fetchStateAlert({
            header: 'Error',
            subHeader: errorTitle,
            message: errorMessage,
            buttons: ['OK'],
        })
    }

    function resetState() {
        setImageUpload(null);
        setAnalyzationData(null);
    }

    return (<IonPage>
        <IonHeader>
            {(imageUpload === null) ? (
                <IonToolbar>
                    <IonTitle>Upload</IonTitle>
                </IonToolbar>
            ) : (
                (plantAnalyzationData === null) ? (
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => {resetState()}}>
                                <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Loading...</IonTitle>
                    </IonToolbar>
                ) : (
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => {resetState()}}>
                                <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>{plantAnalyzationData.name}</IonTitle>
                    </IonToolbar>
                )
            )}
        </IonHeader>
        <IonContent fullscreen>
            {
                (imageUpload === null) ? (
                    <PlantUploadComponent onImageUpload={onImageUpload} />
                ) : (
                    (plantAnalyzationData === null) ? (
                        <FullScreenLoadingComponent name={undefined} />
                    ) :
                        (<PlantReportComponent
                            plantImageSrc={getImageUploadSrc(imageUpload)}
                            plantAnalyzationData={plantAnalyzationData}
                        />)
                )
            }
        </IonContent>
    </IonPage>);
};

export default Page;