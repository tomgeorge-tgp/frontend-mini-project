import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./style/register.css";
import "yup-phone";
import {signup} from "../api/api";
import { signupUrl } from "../url/url";
import {useQuery,useMutation,useQueryClient} from "react-query";
// import useLocalStorageRef from "../hooks/LocalStorage"
import Cookies from 'js-cookie';
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';



const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  phone: Yup.string().max(10,'Phone No is invalid')
  .required('Phone No is Required'),
      
  userType: Yup.string().required("User type is required"),
});

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [dep, setDep] = useState("");
  const [pinNumber,setPinNumber]= useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [phone , setPhone] = useState("");
  const {setAuth}=useAuth();
  //   const [touched,setTouched] = useState('false');
  // const [userData, setUserData, removeUserData] = useLocalStorageRef("user")
   const queryClient=useQueryClient();
   const navigate = useNavigate();
    // Use useMutation to create a signUpMutation object
    const signUpMutation = useMutation(signup, {
      // Handle the success case
      onSuccess: (userData) => {
        console.log("here");
        // TODO: save the user in the state or local storage
        console.log(userData);
        queryClient.setQueryData("user", userData);
        console.log("Registration successful!");
        // Navigate to another page or show a success message
        // setUserData(userData);
        const accessToken=userData?.token;
        // const roles=userData?.otherData?.type;
        const roles=[userData?.otherData?.type];
        const user=userData?.otherData;
        // Navigate to another page or show a success message
       
        localStorage.setItem("auth", JSON.stringify({user,roles,accessToken}))
        setAuth({user,roles,accessToken})
        //  setUserData(user);
        localStorage.setItem("user", JSON.stringify(user))
       
        if (roles.includes('Student')) {
          navigate('/dashboard/user');
        } else if (roles.includes('Counsilor')) {
          navigate('/dashboard/counsilor');
        } else if (roles.includes('Core')) {
          navigate('/dashboard/core');
        }
      
      },
      // Handle the error case
      onError: (error) => {
        // Show an error message or toast
        console.log("Registration failed. Please try again.");
        console.log(error);
      },
    });

  const handleFullNameChange = (event) => {
    console.log("full name", event.target.value);
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value.toString());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    console.log("User type", event.target.value);
    setUserType(event.target.value);
  };
  const handlePinNumberChange = (event) => {
     console.log("Pin number", event.target.value);
     setPinNumber(event.target.value);
  };  
  const handleSubmit = async(event) => {
    event.preventDefault();

    let userInfo = {
      fullname:fullName,
      phone: phone,
      email,
      type:userType,
      password,
    };
    
    switch (userType) {
      case "Core":
        userInfo = {
          ...userInfo,
          role,
          year,
          department: dep,
          pinNumber: pinNumber,
        };
        break;
      case "Counsilor":
        userInfo = {
         ...userInfo,
         pinNumber: pinNumber,
        };
      case "Student":
        userInfo = {
          ...userInfo,
          year,
          department: dep,
        };
        break;
      default:
        break;
    }
    console.log(userInfo); 
    try{
      signUpMutation.mutate(userInfo);  
    }catch(err)
    {
      console.log(err);
    }

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
{ userType!="" ? <>  <Field name="fullName" type="text">
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
            <Field type="number" name="phone">
              {({ field, meta }) => (
                <div className="register-inputBox">
                  <input
                    {...field}
                    type="number"
                    required="required"
                    onChange={handlePhoneChange}
                  />
                  <span>Phone No</span>
                  {meta.touched && errors.phone && phone === "" && (
                    <div className="register-error">{errors.phone}</div>
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
            {userType == "Counsilor" || userType =="Core" ? <> 
            <Field type="pin number" name="pin number">
              {({ field, meta }) => (
                <div className="register-inputBox">
                  <input
                    {...field}
                    type="number"
                    required="required"
                    onChange={handlePinNumberChange}
                  />
                  <span>Pin Number</span>
                  {meta.touched && errors.pinNumber && (
                    <div className="register-error">{errors.pinNumber}</div>
                  )}
                </div>
              )}
            </Field>
           </>
           :"" }
     {userType != "Counsilor" ? <>       
            <div className="varing-form">
            <div className="form-group">
        {/* <label htmlFor="class">Department</label> */}
        <select
          id="class"
          value={dep}
          onChange={(event) => setDep(event.target.value)}
          required
        >
          <option value="">Department</option>
          <option value="CSA">CSA</option>
          <option value="CSB">CSB</option>
          <option value="CSC">CSC</option>
          <option value="CSBS">CSBS</option>
          <option value="ECA">ECA</option>
          <option value="ECB">ECB</option>
          <option value="EB">EB</option>
          <option value="ME">ME</option>
          <option value="EEE">EEE</option>
        </select>
      </div>
            <div className="form-group">
        {/* <label htmlFor="year">Year</label> */}
        <select
          id="year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        >
          <option value="">Year</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
        </select>
      </div>
   {userType ==="Core"?   <div className="form-group">
        {/* <label htmlFor="role">Role</label> */}
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
        >
          <option value="">Role</option>
          <option value="Chair">Chair</option>
          <option value="Vice chair">Vice chair</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Event coordinator">Event coordinator</option>
        </select>
      </div>
       : "" }
       </div>
       </>: ""}
            <button type="submit" className="register-enter" onClick={handleSubmit}>
              Enter
            </button>
            </> : ""}
            <a  className="hover:cursor-pointer" onClick={()=>{
               navigate('/login')
                }}>
         login</a>  
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
