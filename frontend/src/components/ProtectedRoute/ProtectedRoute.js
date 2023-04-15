import { Navigate, Route, Routes } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, ...props }) {
  const token = localStorage.getItem('jwt');
// return (
//   <Routes>
//   <Route {...props}>
//     {isLoggedIn || token ? children: <Navigate to='/welcome'/>}
//   </Route>
//   </Routes>
// )

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to='/welcome' />
  );
}

export default ProtectedRoute;