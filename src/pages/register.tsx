import { Link, useHistory } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
const Register = () => {
  const history = useHistory();
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Register</h3>

        <RegisterForm />
        <p>
          Already have an account?
          <Link
            to={`/login${history.location.search}`}
            style={{ color: "crimson", paddingLeft: ".4rem" }}
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
