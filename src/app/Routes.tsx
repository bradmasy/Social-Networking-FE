import { useAuth } from "../contexts/AuthorizationContext"
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { About, Application, Home, Payment, Signup, Login } from '../pages/index'
import { IndustryInvite } from "../pages/industry-invite/IndustryInvite";
import { IndustryInfo } from "../pages/industry-info/IndustryInfo";
import { useEffect, useState } from "react";

const PrivateRoutes = ({ component }: { component: JSX.Element }) => {
    const auth = useAuth();

    if (!auth.retrieveAuth()) return <Navigate to="/" replace />;

    return component;
}


const IndustryRoute = ({ component }: { component: JSX.Element }) => {
    const auth = useAuth();
    const [hasPermission, setHasPermission] = useState(false); // <-- initially undefined

    useEffect(() => {
        console.log('effect')
        auth.retrieveIndustry()
            .then((res) => {
                console.log(res)
                setHasPermission(res);
            })
            .catch((err) => {
                setHasPermission(false)
            })

    }, [])

    if (hasPermission === undefined) {
        return null;
    }

    return hasPermission ? component : <Navigate to="/" replace />;
}
// const checkIndustry = async () => {
//     try {
//         const isIndustry = await auth.retrieveIndustry();
//         console.log("Retrieve Industry:", isIndustry);

//         if (!isIndustry) {
//             console.log('Redirecting to login');
//             return <Navigate to="/" replace />;
//         } else {
//             console.log('Continuing to industry route');
//             return component;
//         }
//     } catch (error) {
//         console.error("Error checking industry:", error);
//         return <Navigate to="/" replace />;
//     }
// };

// return checkIndustry();
//};

export const Routes = () => {

    return (
        <Router>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/payment" element={<PrivateRoutes component={<Payment />} />} />
            {/* <Route path="/payment" element={authenticated ? <Payment /> : <Navigate to="/" replace />} /> */}
            <Route path="/signup" element={<IndustryRoute component={<Signup />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/industry-invite" element={<IndustryInvite />} />
            <Route path="/industry-info" element={<IndustryInfo />} />

        </Router>
    )
}