import { useHistory } from "react-router-dom";

export default function Logout({ set }) {

    const history = useHistory()
    
    history.push("/")
    set(null)

    return null

}