import { useContext } from "react"
import { AuthorizationContext } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { About, Application, Home, Payment, Signup } from '../pages/index'

type Props = {

}


const PrivateRoutes = ({ component }: { component: JSX.Element }) => {
    const { authenticated } = useContext(AuthorizationContext);

    if (!authenticated) return <Navigate to="/" replace />;

    return component;
}

export const Routes = (props: Props) => {
    return (
        <Router>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/payment" element={<PrivateRoutes component={<Payment />} />} />
            <Route path="/signup" element={<Signup />} />
        </Router>
    )
}