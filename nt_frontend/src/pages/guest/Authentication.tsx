import React, { useState, useContext } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter } from '@ionic/react';
import pageDestinations from '../../data/pageDestinations';
import { interfaceIcons } from '../../data/mediaAssets';
import './style.css';

import "firebase/app";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, Auth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import AlreadyLoggedIn from '../../components/guest/AlreadyLoggedIn'
import { Login, Register } from '../../components/guest/Auth';
import { arrowBack } from 'ionicons/icons';

interface ContainerProps {
    section: 'login' | 'register';
}

const Page: React.FC<ContainerProps> = ({section}) => {
    
    const router = useIonRouter();
    const [authStateAlert] = useIonAlert();
    const firebaseAuth = getAuth();

    function login(email: string, password: string) {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                router.push(pageDestinations.user.dashboard);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                showFirebaseAuthError(errorCode, errorMessage);
            });
    }

    function register(email: string, password: string, passwordConfirmation: string) {
        if (password == passwordConfirmation) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    router.push(pageDestinations.user.dashboard);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    showFirebaseAuthError(errorCode, errorMessage);
                });
        }
        else {
            showError("Passwords do not match!");
        }
    }
    
    function showError(errorMessage: string, errorTitle?: string) {
        authStateAlert({
            header: 'Error',
            subHeader: errorTitle,
            message: errorMessage,
            buttons: ['OK'],
        })
    }

    function showFirebaseAuthError(errorCode: string, errorMessage: string) {
        showError( errorMessage.replace("Firebase: ", "") );
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => {router.push(pageDestinations.guest.home)}}>
                            <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{
                        (section == 'register') ? ("Create an Account") :
                        (section == 'login') ? ("Sign In") : (<></>)
                    }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {(firebaseAuth.currentUser) ?
                    <div className="authentication">
                        <AlreadyLoggedIn firebaseAuth={firebaseAuth} doLogout={() => {}}/>
                    </div> :
                    <div className="authentication">
                        <img style={{width: "64px", height: "auto"}} src={interfaceIcons.auth.common} />
                        {
                            (section == 'register') ? (<Register doRegister={register} />) :
                            (section == 'login') ? (<Login doLogin={login} />) : (<></>)
                        }
                    </div>
                }
            </IonContent>
        </IonPage>
    );
};

export default Page;