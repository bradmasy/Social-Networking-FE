import { useAuth } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { About, Application, Home, Payment, Signup, Login, PaymentSuccess, UserDashboard, Locations } from '../pages/index'
import { IndustryInvite } from "../pages/industry-invite/IndustryInvite";
import { IndustryInfo } from "../pages/industry-info/IndustryInfo";
import { Edit } from "../pages/edit/Edit";

const PrivateRoutes = ({ component }: { component: JSX.Element }) => {
    const auth = useAuth();

    if (!auth.retrieveAuth()) return <Navigate to="/" replace />;

    return component;
}


const IndustryRoute = ({ component }: { component: JSX.Element }) => {
    const auth = useAuth();
    if (!auth.retrieveIndustry()) return <Navigate to="/" replace />;

    return component;
}

export const Routes = () => {

    return (
        <Router>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/payment" element={<PrivateRoutes component={<Payment />} />} />
            <Route path="/signup" element={<IndustryRoute component={<Signup />} />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/industry-invite" element={<IndustryInvite />} />
            <Route path="/industry-info" element={<IndustryInfo />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/edit" element={<PrivateRoutes component={<Edit />} />} />
            {/* <Route path="/locations" element={<PrivateRoutes component={<Locations />} />} /> */}

            {/* <Route path="/user-dashboard" element={<PrivateRoutes component={<UserDashboard/>}/>} /> */}
        </Router>
    )
}