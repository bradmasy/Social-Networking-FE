// import React, { ComponentProps, FC, ReactNode } from 'react';
// import { Route, Navigate, useLocation } from 'react-router-dom';
// import { Payment } from '../pages'; // Assuming Payment component is correctly imported
// import { AuthorizationService } from '../services/authorization/AuthorizationService';
// interface User {
//   // Define your user object structure here
// }

// const withAuth = <Component extends React.ComponentType<any>>(Component: Component) => {
//   return (props: ComponentProps<Component>) => {
//     const location = useLocation();
//     const authService = new AuthorizationService();
//     console.log('here');
//     if (!authService.isAuthenticated()) {
//       return <Navigate to="/login" replace state={{ from: location }} />;
//     }

//     return <Component {...props} />; // Pass props to wrapped component
//   };
// };

// export default withAuth;
// // export default ProtectedRoute;