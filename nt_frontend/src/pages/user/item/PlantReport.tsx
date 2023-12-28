import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonIcon, IonItem, IonLabel, IonNote, IonSegment, IonSegmentButton } from "@ionic/react";
import { airplane, medkit, medkitOutline } from "ionicons/icons";

const Page: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Result</IonTitle>
                </IonToolbar>

                <IonSegment value="default">
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

                <IonList inset={true}>
                    <IonItem lines="none">
                        <IonIcon color="danger" slot="start" icon={medkit} size="large"></IonIcon>
                        <IonLabel><strong>식물 건강</strong></IonLabel>
                        {/* <IonNote slot="end">6</IonNote> */}
                    </IonItem>
                    <IonItem>
                        괜찮은 상태이지만 더 건강할 수 있어요!
                    </IonItem>
                </IonList>

                <IonList inset={true}>
                    <IonItem lines="none">
                        <IonIcon slot="start" icon={medkit} size="large"></IonIcon>
                        <IonLabel><strong>주요 사실</strong></IonLabel>
                        {/* <IonNote slot="end">6</IonNote> */}
                    </IonItem>
                    <IonItem>
                        <IonLabel>독성</IonLabel>
                        <IonNote slot="end">사람 & 반려동물에게 무독성</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonLabel>침입성</IonLabel>
                        <IonNote slot="end">침입성으로 보고되지 않음</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonLabel>종류</IonLabel>
                        <IonNote slot="end">허브</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonLabel>수명</IonLabel>
                        <IonNote slot="end">다년생</IonNote>
                    </IonItem>
                    <IonItem>
                        <IonLabel>재재배 시기</IonLabel>
                        <IonNote slot="end">가을, 봄</IonNote>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
};

export default Page;