import LoadingOverlaySpinner from "./LoadingOverlaySpinner";
import './LoadingOverlay.css'

const LoadingOverlay = ({children, active=true, message}) => {
    
    const overlay = active && (
        <div id='loading-overlay--overlay' >
            <LoadingOverlaySpinner message={message} />
        </div>
    );

    return (
        <div id='loading-overlay--container' >
            {overlay}
            <div id='loading-overlay--children'>
                {children} 
            </div>
        </div>
    );

};

export default LoadingOverlay;