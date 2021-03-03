import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Logout({ set }) {

    const history = useHistory()
    useEffect(() => {
        history.push("/")
        set(null)
    }, [history, set])

    return null

}