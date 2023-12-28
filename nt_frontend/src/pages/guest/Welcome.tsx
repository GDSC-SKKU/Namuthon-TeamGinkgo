import { IonContent, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ContainerProps {
    
}

const Page: React.FC<ContainerProps> = ({}) => {
    return (<IonPage>
        <IonContent fullscreen>
        </IonContent>
    </IonPage>)
};

export default Page;