import { IonButton, IonContent, IonText, IonPage, useIonRouter } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@ionic/react/css/ionic-swiper.css';

import { interfaceIcons } from "../../data/mediaAssets";
import pageDestinations from "../../data/pageDestinations";

interface ContainerProps {
    
}

interface SlideImageProps {
    src: string;
}

const SlideImage1: React.FC<SlideImageProps> = ({src}) => {
    return (<img style={{width: "128px", height: "auto"}} src={src} />);
}
const SlideImage2: React.FC<SlideImageProps> = ({src}) => {
    return (<img style={{width: "194px", height: "auto"}} src={src} />);
}
const SlideImage3: React.FC<SlideImageProps> = ({src}) => {
    return (<img style={{width: "256px", height: "auto"}} src={src} />);
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
        marginBottom: "120px",
        zIndex: 1
    };

    const topLeftTextStyle: React.CSSProperties = {
        position: 'absolute',
        top: '16px', // 위에서부터의 간격
        left: '28px', // 왼쪽에서부터의 간격
        textAlign: 'left', // 텍스트 왼쪽 정렬
        color: 'black', // 텍스트 색상
        // ... 필요한 스타일을 더 추가할 수 있습니다.
    };

    const bottomLeftTextStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '16px', // 하단으로부터의 간격
        left: '16px', // 왼쪽으로부터의 간격
        textAlign: 'left', // 텍스트 왼쪽 정렬
        color: 'black', // 텍스트 색상
        // ... 필요한 스타일을 더 추가할 수 있습니다.
    };
    
    const TopRightImage: React.FC<TopRightImageProps> = ({ src }) => {
        const imageStyle: React.CSSProperties = {
            position: 'absolute',
            top: '28px', // 상단으로부터의 간격
            right: '28px', // 우측으로부터의 간격
            width: '64px', // 이미지 너비
            height: 'auto', // 이미지 높이
        };
    
        return <img style={imageStyle} src={src}/>;
    };

    const BottomRightImage: React.FC<BottomRightImageProps> = ({ src }) => {
        const imageStyle: React.CSSProperties = {
            position: 'absolute',
            bottom: '16px', // 하단으로부터의 간격
            right: '16px', // 우측으로부터의 간격
            width: '128px', // 이미지 너비
            height: 'auto', // 이미지 높이
        };
    
        return <img style={imageStyle} src={src}/>;
    }

    const textStyle: React.CSSProperties = {
        margin: '0.5em 0', // 각 텍스트 요소들 간격 조정
    };


    return (<IonPage>
        <IonContent fullscreen>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                style={{ height: '100vh' }}
            >
                <TopRightImage src={"https://i.postimg.cc/K8xTz90n/logo.png"} />
                <SwiperSlide>
                <div style={topLeftTextStyle}>
                    <h1>전세계 모든 식물을</h1>
                    <h1>건강하게!</h1>
                </div>
                    <section>
                        <SlideImage1 src={"https://i.postimg.cc/1tHcmkQV/a.png"} />
                        <h1>Welcome!</h1>
                        <IonText color="medium">
                            <p>A project by 은행나무</p>
                        </IonText>
                    </section>
                </SwiperSlide>

                <SwiperSlide>
                <div style={topLeftTextStyle}>
                    <h1>처음 보는 식물도</h1>
                    <h1>간편하게 진단!</h1>
                </div>
                <section>
                    <SlideImage2 src={"https://i.postimg.cc/0NtDhpd7/b.png"} />
                    <h1>Welcome!</h1>
                    <IonText color="medium">
                        <p>A project by 은행나무</p>
                    </IonText>
                </section>
                </SwiperSlide>
                    
                <SwiperSlide>
                <div style={topLeftTextStyle}>
                    <h1>믿음직한 AI 진단과</h1>
                    <h1>솔루션을 해주는 '팝'</h1>
                </div>
                <section>
                    <SlideImage3 src={"https://i.postimg.cc/26VhYV2M/c.png"} />
                    <h1>Welcome!</h1>
                    <IonText color="medium">
                        <p>A project by 은행나무</p>
                    </IonText>
                </section>
                </SwiperSlide>
                
            </Swiper>
            <div style={commonSlideElementStyle}>
                <IonButton expand="block" size="large" onClick={() => {router.push(pageDestinations.guest.register)}}>Get Started</IonButton>
                <p style={{margin: "8px"}}><small>Already have an account? <a href="javascript:void(0)" onClick={() => {router.push(pageDestinations.guest.login)}}>Login</a></small></p>
            </div>
                <div style={bottomLeftTextStyle}>
                    <p style={textStyle}>본 AI 애플리케이션은</p>
                    <p style={textStyle}>식물의 병을 실시간으로 진단해주며</p>
                    <p style={textStyle}>질병 예방법과 해결책을 제공해줍니다.</p>
                </div>
                <BottomRightImage src={"data:image/png;base64,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"} />

        </IonContent>
    </IonPage>)
};

export default Page;