import { useAuth } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { About, Application, Home, Payment, Signup, Login } from '../pages/index'

const PrivateRoutes = ({ component }: { component: JSX.Element }) => {
    const auth = useAuth();

    if (!auth.retrieveAuth()) return <Navigate to="/" replace />;

    return component;
}

export const Routes = () => {

    return (
        <Router>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/payment" element={<PrivateRoutes component={<Payment />} />} />
            {/* <Route path="/payment" element={authenticated ? <Payment /> : <Navigate to="/" replace />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

        </Router>
    )
}