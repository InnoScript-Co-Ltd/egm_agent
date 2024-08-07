import { useEffect, useState } from "react";
import DEFAULT_IMAGE from "../../assets/images/default_image.png";
import { useSelector } from "react-redux";
import { endpoints } from "../../constants/endpoints";
import "./profile-image-upload.css";

export const ProfileImageUpload = ({onSelect}) => {

    const { user } = useSelector(state => state.account);

    const [preview, setPreview] = useState(user.profile);

    const selectedFile = (e) => {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreview(objectUrl);
        onSelect(e.target.files[0]);
    }

    useEffect(() => {
        if(user && user.profile !== null) {
            setPreview(`${endpoints.image}/${user.profile}`);
        }
    },[user]);

    return (
        <div className="profile-update-wrapper">
            <img
                className="preview-profile"
                src={preview ? preview : DEFAULT_IMAGE}
                alt="Evan Global Management"
                title="Evan Global Management"
                onClick={() => {
                    document.getElementById("profile").click();
                }}
            />

            <input
                id="profile"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => selectedFile(e)}
            />
        </div>
    )
}