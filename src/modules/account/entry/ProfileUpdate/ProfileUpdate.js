import { ProfileImageUpload } from "../../../../shares/ProfileImageUpload/ProfileImageUpload"

export const ProfileUpdate = () => {

    return(
        <div className="row">
            <div className="col-12 mt-3">
                <ProfileImageUpload onSelect={(e) => console.log(e)} />
            </div>
        </div>
    )
}