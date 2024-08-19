import { useCallback, useEffect, useState } from "react"
import numeral from "numeral";

export const AmountFormat = ({ datasource }) => {

    const [normalText, setNormalText] = useState(0);
    const [supText, setSupText] = useState(0);

    const initLoading = useCallback(async () => {
        if (datasource) {
            const amountArray = numeral(datasource).format('0,0').split(',');
            setNormalText(amountArray[0]);
            setSupText(amountArray.filter((value, index) => index !== 0).toString());
        }
    }, [datasource]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <>
            {normalText && (
                <span> {normalText}, </span>
            )}
            {supText && (
                <sup style={{fontWeight: "bold"}}> {supText} </sup>
            )}
        </>
    )
}