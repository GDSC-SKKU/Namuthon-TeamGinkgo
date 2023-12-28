import { IonSpinner } from "@ionic/react";

interface ContainerProps {
    name: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | "lines-sharp" | "lines-sharp-small" | undefined;
}

export const FullScreenLoadingComponent: React.FC<ContainerProps> = ({name}) => {
    return (
        <div style={{
            textAlign: "center",
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)"
        }}>
            <IonSpinner name={name}></IonSpinner>
        </div>
    );
};
