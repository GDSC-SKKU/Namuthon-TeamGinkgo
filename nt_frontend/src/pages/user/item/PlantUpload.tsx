import { IonPage, IonHeader, IonToolbar, IonTitle, IonSegment, IonSegmentButton, IonLabel, IonContent, IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
import { useEffect } from "react";

interface ContainerProps {

};

const Page: React.FC<ContainerProps> = ({}) => {

    const [uploadStateAlert] = useIonAlert();

    function askUserForFileUpload(): void {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.jpg,.jpeg,.png,.gif';
      
        // Add an event listener to handle file selection
        fileInput.addEventListener('change', handleFileSelection);
      
        // Trigger the file selection dialog
        fileInput.click();
    }
      
    // Function to handle the selected file
    function handleFileSelection(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        
        // Check if files were selected
        if (inputElement.files && inputElement.files.length > 0) {
          // Access the selected file(s)
          const selectedFile = inputElement.files[0];
          //console.log('Selected file:', selectedFile);
      
          // You can now perform further actions with the selected file
          // For example, you can upload the file to a server or process it locally.
        }
    }
    
    function showError(errorMessage: string, errorTitle?: string) {
        uploadStateAlert({
            header: 'Error',
            subHeader: errorTitle,
            message: errorMessage,
            buttons: ['OK'],
        })
    }

    return (<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Upload</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        </IonContent>
    </IonPage>);
};

export default Page;