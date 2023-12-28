import { useIonAlert, IonButton } from "@ionic/react";
import { useEffect } from "react";

interface ContainerProps {
    onImageUpload: (file: File) => void;
}

const PlantUploadComponent: React.FC<ContainerProps> = ({onImageUpload}) => {

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
            onImageUpload(selectedFile);
        }
    }
      
    return (
        <div style={{
            textAlign: "center",
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)"
        }}>
            <IonButton color="dark" size="large" onClick={() => {askUserForFileUpload()}} onLoad={() => {askUserForFileUpload()}}>
                Upload
            </IonButton>
        </div>
  ) ;
};

export default PlantUploadComponent;
