import { useAuth } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate, useNavigate } from "react-router-dom";
import { About, Application, Home, Payment, Signup, Login, PaymentSuccess, UserDashboard, Locations, PaymentMembership, Logout, LocationDetails, Spaces, SpaceDetails, ComingSoon, Bookings, BookingDate, BookingDetail } from '../pages/index'
import { IndustryInvite } from "../pages/industry-invite/IndustryInvite";
import { IndustryInfo } from "../pages/industry-info/IndustryInfo";
import { Edit } from "../pages/edit/Edit";
import { useEffect, useState } from "react";
import { Membership } from "../pages/user-dashboard/UserDashboard";
import { LoadingOverlay } from "../components/overlays/loading-overlay/LoadingOverlay";

const PrivateRoutes = ({ component }: { component: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const result = await auth.getMembership(); // Assuming this returns a boolean or membership object
            (result ? setIsAuthenticated(true) : setIsAuthenticated(false));
            // if (result) {
            //     setIsAuthenticated(true);
            // } else {
            //     setIsAuthenticated(false);
            // }
        };
        checkAuth();
    }, [auth]);

    if (isAuthenticated === null) {
        return <LoadingOverlay />;
    }

    return isAuthenticated ? component : <Navigate to="/login" replace />;
};



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
            <Route path="/locations/:id/events" element={<PrivateRoutes component={<ComingSoon />} />} />
            <Route path="/locations/:id/bookings" element={<PrivateRoutes component={<Bookings />} />} />
            <Route
                path={`/locations/:id/bookings/date`}
                element={<PrivateRoutes component={<BookingDate />} />}
            />
            <Route
                path={`/locations/:id/bookings/detail`}
                element={<PrivateRoutes component={<BookingDetail />} />}
            />
            <Route path="/coming-soon" element={<PrivateRoutes component={<ComingSoon />} />} />

            <Route path="/user-dashboard" element={<PrivateRoutes component={<UserDashboard />} />} />
            <Route path="/logout" element={<PrivateRoutes component={<Logout />} />} />
        </Router>
    )
}