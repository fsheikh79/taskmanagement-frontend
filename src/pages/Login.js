import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import taskLogo from '../assets/task-management-tips.webp'
import { useMutation } from 'react-query'
import { postmethod } from '../apiinstance/apiinstance';
import { ToastContainer, toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    Email: "",
    Password: ""
  })
  const [errors, setErrors] = useState({

    Email: "",
    Password: "",
  });
  const [flag, setFlag] = useState(false)
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validation logic
    let error = "";
    if (name === "Email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format.";
    } else if (name === "Password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one capital letter.";
      } else if (!/[a-z]/.test(value)) {
        error = "Password must contain at least one lowercase letter.";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number.";
      } else if (!/[!@#$%^&*()_+[\]{}|;:'",.<>?~\\/-]/.test(value)) {
        error = "Password must contain at least one special symbol.";
      }
    }

    setErrors({ ...errors, [name]: error });
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };
  const loginUser = async () => {
    try {
      const response = await postmethod({
        url: `login`,
        body: JSON.stringify(userdata),
        headers: {
          'Content-Type': 'application/json',
      }
      });
      
      if (response?.status === 200) {
        localStorage.setItem('Token', response?.token)
        navigate('/Home')
        return
      } else if (response?.status == 409) {
        setUserdata((prevFormData) => ({
          ...prevFormData,
          Email: '',
          Password: ""
        }));
        toast.error('No user found , Please register', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        // return
      }
      else if (response?.status == 401) {
        setUserdata((prevFormData) => ({
          ...prevFormData,
          Username: '',
          Email: '',
          Password: ""
        }));
        toast.error('Invalid password. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  const { isLoading, error, data, mutate } = useMutation(loginUser);
  const handleSubmit = async () => {
    // Check for errors
    let hasErrors = false;
    const newErrors = {};

    if (userdata?.Username?.trim() === "") {
      newErrors.Username = "Username is required.";
      hasErrors = true;
    } else if (userdata?.Username?.length < 3) {
      newErrors.Username = "Username must be at least 3 characters long.";
      hasErrors = true;
    }
    if (!/\S+@\S+\.\S+/.test(userdata?.Email)) {
      newErrors.Email = "Invalid email format.";
      hasErrors = true;
    }
    if (userdata?.Password?.length < 6) {
      newErrors.Password = "Password must be at least 6 characters long.";
      hasErrors = true;
    } else if (!/[A-Z]/.test(userdata?.Password)) {
      newErrors.Password = "Password must contain at least one capital letter.";
      hasErrors = true;
    } else if (!/[a-z]/.test(userdata?.Password)) {
      newErrors.Password = "Password must contain at least one lowercase letter.";
      hasErrors = true;
    } else if (!/\d/.test(userdata?.Password)) {
      newErrors.Password = "Password must contain at least one number.";
      hasErrors = true;
    } else if (!/[!@#$%^&*()_+[\]{}|;:'",.<>?~\\/-]/.test(userdata.Password)) {
      newErrors.Password = "Password must contain at least one special symbol.";
      hasErrors = true;
    }
    setErrors(newErrors);

    if (!hasErrors) {
      
      await mutate();

    }
    setUserdata((prevFormData) => ({
      ...prevFormData,
      Email: '',
      Password: ""
    }));

  };
  useEffect(() => {
    if (flag) {
      navigate('/', { replace: true });
    }
  }, [flag]);
  const debounceHanlder = debounce(handleSubmit, 3000)
  const redirectRegister = () => {
    setFlag(true)
  }
  return (
    <MDBContainer className=" gradient-form " style={{ maxWidth: "550px" }}>

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column">

            <div className="text-center">
              <img src={taskLogo} style={{ width: '185px' }} alt="logo"></img>
              <h4 className="mt-1 mb-5 pb-1">Task Management System</h4>
            </div>

            <p>Please login to your account</p>
            <MDBInput wrapperClass=' mt-3' label='Email address' id='form1' type='email' name='Email' value={userdata.Email}
              onChange={(e) => handleInputChange(e)} error="Invalid email format." />
            {errors.Email && <div className="text-danger">{errors.Email}</div>}
            <MDBInput wrapperClass=' mt-3 mb-3' label='Password' id='form2' type='password' name='Password' value={userdata.Password}
              onChange={(e) => handleInputChange(e)} error="Password must be at least 6 characters long." />

            {errors.Password && <div className="text-danger">{errors.Password}</div>}



            <div className="text-center pt-1 mb-4 pb-1">
              <MDBBtn className=" w-100 gradient-custom-2" onClick={debounceHanlder}>Sign in</MDBBtn>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger' onClick={redirectRegister}>
                Register your account
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

      </MDBRow>
      <ToastContainer></ToastContainer>
    </MDBContainer>
  );
}

export default Login;