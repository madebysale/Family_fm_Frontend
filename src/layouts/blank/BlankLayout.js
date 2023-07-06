import { Link as RouterLink,Outlet } from "react-router-dom";

const BlankLayout = () => (
  <>
    <RouterLink to="/"></RouterLink>
    <Outlet />
  </>
);

export default BlankLayout;
