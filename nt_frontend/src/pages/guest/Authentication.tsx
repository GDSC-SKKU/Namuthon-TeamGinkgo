import React, { useState, useContext } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import pageDestinations from '../../data/pageDestinations';
import { interfaceIcons } from '../../data/mediaAssets';
import './style.css';

import "firebase/app";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, Auth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import AlreadyLoggedIn from '../../components/guest/AlreadyLoggedIn'
import { Login, Register } from '../../components/guest/Auth';
import { Route, Router } from 'react-router';

interface ContainerProps {
    firebaseAuth: Auth;
    section: 'login' | 'register';
}

const Page: React.FC<ContainerProps> = ({firebaseAuth, section}) => {
    
    const router = useIonRouter();

    function login(email: string, password: string) {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                window.location.href = pageDestinations.user.dashboard;
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
                    window.location.href = pageDestinations.user.dashboard;
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

    function logout() {
        signOut(firebaseAuth).then(() => {
            router.push(pageDestinations.guest.login);
        }).catch((error) => {
            showError(error.message);
        });
    }

    function showError(errorMessage: string) {
        console.error(errorMessage);
    }

    function showFirebaseAuthError(errorCode: string, errorMessage: string) {
        console.error(errorCode, errorMessage);
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Sign In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {(firebaseAuth.currentUser) ?
                    <div className="authentication">
                        <AlreadyLoggedIn firebaseAuth={firebaseAuth} doLogout={() => {logout()}}/>
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