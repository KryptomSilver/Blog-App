import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormSubmit, InputChange } from "../../interfaces/interfaces";
import { register } from "../../redux/actions/authActions";

const RegisterForm = () => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    account: "",
    password: "",
    cf_password: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();
  const { name, password, account, cf_password } = userRegister;
  const handleChanngeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={name}
          onChange={handleChanngeInput}
          placeholder="Your name is up to 20 chars."
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email / Phone Number
        </label>
        <input
          type="text"
          name="account"
          id="account"
          className="form-control"
          value={account}
          onChange={handleChanngeInput}
          placeholder="example@gmail.com/+523121231223"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handleChanngeInput}
            placeholder="Password must be at least 6 chars."
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="cf_password" className="form-label">
          Confirm Password
        </label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            name="cf_password"
            id="cf_password"
            className="form-control"
            value={cf_password}
            onChange={handleChanngeInput}
            placeholder="Your confirm password."
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <button type="submit" className="btn btn-dark w-100 my-1">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
