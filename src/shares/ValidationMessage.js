import { useSelector } from "react-redux";

export const ValidationMessage = ({field}) => {

    const {errors } = useSelector(state => state.share);
    
    return (
        <>
            { errors && field && errors[field] && (
                <span className="error-message"> *{ errors[field][0] } </span>
            )}
        </>
    )
}