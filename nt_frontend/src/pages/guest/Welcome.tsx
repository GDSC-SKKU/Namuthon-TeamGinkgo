import { IonButton, IonContent, IonText, IonPage, useIonRouter } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { interfaceIcons } from "../../data/mediaAssets";
import pageDestinations from "../../data/pageDestinations";

interface ContainerProps {
    
}

interface SlideImageProps {
    src: string;
}

const SlideImage: React.FC<SlideImageProps> = ({src}) => {
    return (<img style={{width: "128px", height: "auto"}} src={src} />);
}

const Page: React.FC<ContainerProps> = ({}) => {
    const router = useIonRouter();

    const commonSlideElementStyle: React.CSSProperties = {
        width: "85%",
        maxWidth: "512px",
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, 0)",
        textAlign: "center",
        marginBottom: "16px",
        zIndex: 1
    };

    return (<IonPage>
        <IonContent fullscreen>
            <Swiper
                autoplay={true}
                keyboard={true}
                pagination={true}
                scrollbar={true}
                zoom={true}
                slidesPerView={'auto'}
                style={{ height: '100vh' }}
            >
                <SwiperSlide>
                    <section>
                        {/* <SlideImage src={interfaceIcons.auth.common} /> */}
                        <h1>Welcome!</h1>
                        <IonText color="medium">
                            <p>A project by </p>
                        </IonText>
                    </section>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
            <div style={commonSlideElementStyle}>
                <IonButton expand="block" size="large" onClick={() => {router.push(pageDestinations.guest.register)}}>Get Started</IonButton>
                <p style={{margin: "8px"}}><small>Already have an account? <a href={pageDestinations.guest.login}>Login</a></small></p>
            </div>
        </IonContent>
    </IonPage>)
};

export default Page;