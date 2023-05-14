import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./style/register.css";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  userType: Yup.string().required("User type is required"),
});

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  //   const [touched,setTouched] = useState('false');
  const handleFullNameChange = (event) => {
    console.log("full name", event.target.value);
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    console.log("User type", event.target.value);
    setUserType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User Type:", userType);
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Formik validationSchema={RegisterSchema} >
        {({ errors, touched }) => (
          <Form className="register-card">
            <a className="register-sigup">Sign Up</a>
            <div className="register-mydict">
              <div>
                <label className="register-label">
                  <Field
                    className="register-radio"
                    type="radio"
                    name="userType"
                    value="Core"
                    onChange={handleUserTypeChange}
                    checked={userType === "Core" ? true : false}
                  />
                  <span>Core</span>
                </label>
                <label className="register-label">
                  <Field
                    className="register-radio"
                    type="radio"
                    name="userType"
                    value="Student"
                    onChange={handleUserTypeChange}
                    checked={userType === "Student" ? true : false}
                  />
                  <span>Student</span>
                </label>
                <label className="register-label">
                  <Field
                    className="register-radio"
                    type="radio"
                    name="userType"
                    value="Counsilor"
                    onChange={handleUserTypeChange}
                    checked={userType === "Counsilor" ? true : false}
                  />
                  <span>Counsilor</span>
                </label>
                {errors.userType && userType == "" ? (
                  <div className="register-error">{errors.userType}</div>
                ) : null}
              </div>
            </div>

            <Field name="fullName" type="text">
              {({ field, meta }) => (
                <>
                  <div className="register-inputBox1">
                    <input
                      {...field}
                      type="text"
                      required="required"
                      onChange={handleFullNameChange}
                    />
                    <span>Full Name</span>
                    {meta.touched && errors.fullName && fullName === "" && (
                      <div className="error">{errors.fullName}</div>
                    )}
                  </div>
                </>
              )}
            </Field>

            <Field type="email" name="email">
              {({ field, meta }) => (
                <div className="register-inputBox">
                  <input
                    {...field}
                    type="text"
                    required="required"
                    onChange={handleEmailChange}
                  />
                  <span>Email</span>
                  {meta.touched && errors.email && email === "" && (
                    <div className="register-error">{errors.email}</div>
                  )}
                </div>
              )}
            </Field>

            <Field type="password" name="password">
              {({ field, meta }) => (
                <div className="register-inputBox">
                  <input
                    {...field}
                    type="password"
                    required="required"
                    onChange={handlePasswordChange}
                  />
                  <span>Password</span>
                  {meta.touched && errors.password && (
                    <div className="register-error">{errors.password}</div>
                  )}
                </div>
              )}
            </Field>
            <button type="submit" className="register-enter" onClick={handleSubmit}>
              Enter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
