import { getAuth, signOut } from "firebase/auth";
import pageDestinations from "../../data/pageDestinations";
import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { arrowBack, logOutOutline } from "ionicons/icons";
import { useState } from "react";
import { PlanetAnalyzationResponse } from "../../data/apiStandard";
import { useUserDataStorage } from "../../data/localStorage";
import PlantReportComponent, { getPlanetHealthStatus } from "../../components/user/plant/Report";
import { interfaceIcons } from "../../data/mediaAssets";

interface ContainerProps {
    //firebaseAuth: Auth;
    //doLogout: () => void;
}

const Page: React.FC<ContainerProps> = ({}) => {
    
    const router = useIonRouter();
    const [authStateAlert] = useIonAlert();

    const [history, setHistory] = useUserDataStorage.plantAnalyzationHistory();
    const [currentView, setCurrentView] = useState<{data: PlanetAnalyzationResponse, base64Image: string} | null>(null);

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
            {(currentView === null) ? (
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => {logout()}}>
                            로그아웃
                            <IonIcon slot="end" icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
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

                    (history.length > 0) ? (
                        <>
                            {
                                [0].map((_) => {
                                    const recentAnalyzation = history[0];
                                    const planetHealthStatus = getPlanetHealthStatus(recentAnalyzation.data);

                                    if (planetHealthStatus.status === "danger") {
                                        return (<section style={{textAlign: "center", marginTop: "48px", marginBottom: "24px"}}>
                                            <img src={interfaceIcons.status.danger} style={{width: "30%", maxWidth: "96px"}} />
                                            <h3>식물 분석 기록</h3>
                                            <p style={{margin: "4px"}}>위험한 상태입니다!</p>
                                        </section>)
                                    }
                                    else if (planetHealthStatus.status === "warning") {
                                        return (<section style={{textAlign: "center", marginTop: "48px", marginBottom: "24px"}}>
                                            <img src={interfaceIcons.status.warning} style={{width: "30%", maxWidth: "96px"}} />
                                            <h3>식물 분석 기록</h3>
                                            <p style={{margin: "4px"}}>주의가 필요합니다!</p>
                                        </section>)
                                    }
                                    else if (planetHealthStatus.status === "light") {
                                        return (<section style={{textAlign: "center", marginTop: "48px", marginBottom: "24px"}}>
                                            <img src={interfaceIcons.status.light} style={{width: "30%", maxWidth: "96px"}} />
                                            <h3>식물 분석 기록</h3>
                                            <p style={{margin: "4px"}}>주의가 필요합니다!</p>
                                        </section>)
                                    }

                                    return (<section style={{textAlign: "center", marginTop: "48px", marginBottom: "24px"}}>
                                        <img src={interfaceIcons.status.normal} style={{width: "30%", maxWidth: "96px"}} />
                                        <h3>식물 분석 기록</h3>
                                        <p style={{margin: "4px"}}>아주 잘하고 있어요!</p>
                                    </section>)
                                })
                            }
                            <IonList inset={true}>
                                {
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
                                }
                            </IonList>
                        </>
                    ) : (
                        <div style={{
                            textAlign: "center",
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)"
                        }}>
                            <img src={interfaceIcons.status.normal} style={{width: "30%", maxWidth: "192px"}} />
                            <h2>안녕하세요!</h2>
                            <p>식물 분석을 시작해보세요!</p>
                            <IonButton routerLink={pageDestinations.user.upload}>
                                업로드하기
                            </IonButton>
                        </div>
                    )

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