import { getAuth, signOut } from "firebase/auth";
import pageDestinations from "../../data/pageDestinations";
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useUserDataStorage } from "../../data/localStorage";

interface ContainerProps {
}

const Page: React.FC<ContainerProps> = ({}) => {
    
    const router = useIonRouter();
    const [authStateAlert] = useIonAlert();

    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.push(pageDestinations.guest.home);
        }).catch((error) => {
            showError(error.message);
        });
    }

    function showError(errorMessage: string, errorTitle?: string) {
        authStateAlert({
            header: 'Error',
            subHeader: errorTitle,
            message: errorMessage,
            buttons: ['OK'],
        })
    }

    const [plantAnalyzationHistory, setPlantAnalyzationHistory] = useUserDataStorage.plantAnalyzationHistory();

    return (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>History</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList inset={true}>
                {
                    plantAnalyzationHistory.map((analyzation, index) => {
                        return (<IonItem key={index}>
                            <IonAvatar aria-hidden="true" slot="start">
                                <img src={analyzation.base64Image} />
                            </IonAvatar>
                            <IonLabel>{analyzation.data.name}</IonLabel>
                            <IonNote slot="end">{
                                analyzation.timestamp.toLocaleDateString() + " " + analyzation.timestamp.toLocaleTimeString()
                            }</IonNote>
                        </IonItem>)
                    })
                }
            </IonList>
        </IonContent>
    </IonPage>);
}

export default Page;