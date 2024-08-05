import { useState } from "react";
import DEFAULT_IMAGE from "../../assets/images/default_image.png";
import "./style.css";

export const ImageUpload = ({ id, onSelect, label, loading }) => {

    const [src, setSrc] = useState(null);
    const selectedFile = (e) => {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setSrc(objectUrl);
        onSelect(e.target.files[0]);
    }

    return (
        <div className="image-upload-wrapper mt-3">
            <img
                className="image-upload-default-image"
                src={src ? src : DEFAULT_IMAGE}
                alt="Evan Global Management"
                title="Evan Global Management"
            />

            <input
                id={id}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => selectedFile(e)}
            />
            
            <button
                disabled={loading}
                className="btn btn-primary btn-upload-template"
                onClick={() => {
                    document.getElementById(id).click();
                }}> {label} </button>
        </div>
    )
}