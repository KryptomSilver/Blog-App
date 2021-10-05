import React, { useState } from "react";
import { InputChange } from "../../interfaces/interfaces";

const LoginPass = () => {
  const [login, setlogin] = useState({
    account: "",
    password: "",
  });
  const [typePass, setTypePass] = useState(false);
  const { password, account } = login;
  const handleChanngeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setlogin({ ...login, [name]: value });
  };
  return (
    <form>
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
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100 my-1"
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
