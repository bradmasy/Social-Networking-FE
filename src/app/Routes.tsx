import { useAuth } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { About, Application, Home, Payment, Signup, Login, PaymentSuccess, UserDashboard, Locations, PaymentMembership, Logout, LocationDetails, Spaces, SpaceDetails, ComingSoon, Bookings } from '../pages/index'
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
            <Route path="/payment/membership" element={<PrivateRoutes component={<PaymentMembership />} />} />
            <Route path="/payment" element={<PrivateRoutes component={<Payment />} />} />
            <Route path="/signup" element={<IndustryRoute component={<Signup />} />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/industry-invite" element={<IndustryInvite />} />
            <Route path="/industry-info" element={<IndustryInfo />} />
            <Route path="/edit" element={<PrivateRoutes component={<Edit />} />} />
            <Route path="/locations" element={<PrivateRoutes component={<Locations />} />} />
            <Route path="/locations/:id" element={<PrivateRoutes component={<LocationDetails />} />} />
            <Route path="/locations/:id/spaces" element={<PrivateRoutes component={<Spaces />} />} />
            <Route path="/locations/:id/spaces/:space" element={<PrivateRoutes component={<SpaceDetails />} />} />
            <Route path="/locations/:id/events" element={<PrivateRoutes component={<ComingSoon/>} />} />
            <Route path="/locations/:id/bookings" element={<PrivateRoutes component={<Bookings/>} />} />

            <Route path="/coming-soon" element={<PrivateRoutes component={<ComingSoon/>} />} />

            <Route path="/user-dashboard" element={<PrivateRoutes component={<UserDashboard />} />} />
            <Route path="/logout" element={<PrivateRoutes component={<Logout />} />} />
        </Router>
    )
}