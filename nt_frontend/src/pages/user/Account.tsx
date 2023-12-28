import { getAuth, signOut } from "firebase/auth";
import pageDestinations from "../../data/pageDestinations";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";

interface ContainerProps {
    //firebaseAuth: Auth;
    //doLogout: () => void;
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

    return (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Account</IonTitle>

                <IonButtons slot="end">
                    <IonButton onClick={() => {logout()}}>
                        로그아웃
                        <IonIcon slot="end" icon={logOutOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        </IonContent>
    </IonPage>);
}

export default Page;