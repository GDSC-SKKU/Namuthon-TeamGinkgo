import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonAlert } from "@ionic/react";
import { useState } from "react";
import PlantUploadComponent from "../../components/user/plant/Upload";
import PlantReportComponent from "../../components/user/plant/Report";
import { PlanetAnalyzationRequest, PlanetAnalyzationResponse, backendUrl } from "../../data/apiStandard";


interface ContainerProps {

};

const Page: React.FC<ContainerProps> = ({}) => {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [plantAnalyzationData, setAnalyzationData] = useState<PlanetAnalyzationResponse | null>(null);

    const [fetchStateAlert] = useIonAlert();

    function getImageUploadSrc(file: File): string {
        return URL.createObjectURL(file);
    }

    function onImageUpload(file: File) {
        setImageUpload(file);
        requestPlantAnalyzation(file);
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
                    setAnalyzationData(data);
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
            <IonToolbar>
                <IonTitle>{(imageUpload === null) ? ("Upload") : ("Report")}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            {
                (imageUpload === null) ? (
                    <PlantUploadComponent onImageUpload={onImageUpload} />
                ) : (
                    (plantAnalyzationData === null) ? (<>Loading...</>) :
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