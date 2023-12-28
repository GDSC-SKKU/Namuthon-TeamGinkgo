import React from 'react';
import { IonButton } from '@ionic/react';
import { Auth, signOut } from 'firebase/auth';

import pageDestinations from '../../data/pageDestinations';
import { interfaceIcons } from '../../data/mediaAssets';

interface ContainerProps {
    firebaseAuth: Auth;
    doLogout: () => void;
}

const AlreadyLoggedIn: React.FC<ContainerProps> = ({firebaseAuth, doLogout}) => {
    function dashboard() {
        window.location.href = pageDestinations.user.dashboard;
    }

    return (
        <div>
            <img style={{width: "128px", height: "auto"}} src={interfaceIcons.auth.common} />
            <h1>Already Logged In!</h1>
            <div style={{margin: "24px 4px"}}>
                <IonButton expand="block" onClick={dashboard} size="large">Dashboard</IonButton>
                <IonButton expand="block" onClick={doLogout} fill="outline">Log Out</IonButton>
            </div>
        </div>
    );
};

export default AlreadyLoggedIn;