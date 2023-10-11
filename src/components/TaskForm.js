import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {  postmethod,putmethod,getmethod } from '../apiinstance/apiinstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import TaskList from './TaskList';
import { useNavigate } from "react-router-dom";
export default function TaskFrom2() {
    const navigate = useNavigate();

    const [addTask, setAddTask] = useState({
        Title: "",
        TaskDescription: ""
    })

    const [errors, setErrors] = useState({
        Title: "",
        TaskDescription: ""
    });
    
    const [flag, setFlag] = useState(false)
    const [idfilter, setIdfilter] = useState('')
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Validation logic
        let error = "";
        if (name === "Title") {
            if (value.trim() === "") {
                error = "Title is required.";
            } else if (value.trim().length < 3) {
                error = "Title must be at least 3 characters long.";
            }
        } else if (name === "TaskDescription") {
            if (value.trim() === "") {
                error = "Taskdescription is required.";
            } else if (value.trim().length < 3) {
                error = "Taskdescription must be at least 3 characters long.";
            }
        }

        setErrors({ ...errors, [name]: error });
        setAddTask({
            ...addTask,
            [name]: value,
        });
    };
   
    const editClickedHanlder = (Id, filterData,refetch) => {
        setIdfilter(Id)
        setAddTask({
            Title: filterData[0]?.Title,
            TaskDescription: filterData[0]?.TaskDescription
        });
    }
      
    const fetcher = async () => {
        try {
            const getToken = localStorage.getItem('Token')

            const response = await getmethod({
                url: `getalltask`,

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken
                }
            });
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    const { isLoading:isLoadingfetcher, error:errorfetcher, data:datafetcher, refetch } = useQuery('getalltask', fetcher)

    const addtaskHanlder = async () => {
        // console.log("addTask",addTask)
        try {
            const getToken = localStorage.getItem('Token')
            if(getToken){

                const response = await postmethod({
                    url: `addtask`,
                    body: JSON.stringify(addTask),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getToken
                    }
                });
                if (response?.status === 201) {
                    refetch()
                    setAddTask((prevFormData) => ({
                        ...prevFormData,
                        Title: '',
                        TaskDescription: ''
                    }));
                    toast.success('Task is added successfully  ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                return response;
            }
            else{
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const { isLoading, error, data, mutate } = useMutation(addtaskHanlder);
    const editTaskHanlder = async () => {

        try {
            const getToken = localStorage.getItem('Token')
            if(getToken){
                const response = await putmethod({
                    url: `updateTask/${idfilter}`,
                    body: JSON.stringify(addTask),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getToken
                    }
                });
                if (response?.status === 201) {
                    refetch()
                    setAddTask((prevFormData) => ({
                        ...prevFormData,
                        Title: '',
                        TaskDescription: ''
                    }));
                    
                    toast.success('Task is updated successfully  ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    
                }
                return response;
            }
            else{
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const { isLoading: isLoadingEdit, error: errorEdit, data: dataEdit, mutate: mutateEdit } = useMutation(editTaskHanlder);
    
    const handleSubmit = async () => {
        // Check for errors
        let hasErrors = false;
        const newErrors = {};

        if (addTask?.Title?.trim() === "") {
            newErrors.Title = "Title is required.";
            hasErrors = true;
        } else if (addTask?.Title?.length < 3) {
            newErrors.Title = "Title must be at least 3 characters long.";
            hasErrors = true;
        }

        if (addTask?.TaskDescription?.trim() === "") {
            newErrors.TaskDescription = "Taskdescription is required.";
            hasErrors = true;
        } else if (addTask?.TaskDescription?.length < 3) {
            newErrors.TaskDescription = "Taskdescription must be at least 3 characters long.";
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            refetch()
            await mutate();
            return;
        }


    };
    const handleSubmitEdit = async () => {
        // Check for errors
        let hasErrors = false;
        const newErrors = {};

        if (addTask?.Title?.trim() === "") {
            newErrors.Title = "Title is required.";
            hasErrors = true;
        } else if (addTask?.Title?.length < 3) {
            newErrors.Title = "Title must be at least 3 characters long.";
            hasErrors = true;
        }

        if (addTask?.TaskDescription?.trim() === "") {
            newErrors.TaskDescription = "Taskdescription is required.";
            hasErrors = true;
        } else if (addTask?.TaskDescription?.length < 3) {
            newErrors.TaskDescription = "Taskdescription must be at least 3 characters long.";
            hasErrors = true;
        }
        setErrors(newErrors);

        if (!hasErrors) {
            setFlag(false)
            refetch()
            await mutateEdit();
            return;
        }


    };
    
    const debounceHanlder = debounce(handleSubmit, 5000)
    const debounceHanlderEdit = debounce(handleSubmitEdit, 5000)
    
    return (
        <>
            <div>
                <div className="container border rounded d-flex justify-content-center shadow p-3 mt-3 mb-5 bg-white rounded">
                
                    {/* <div className="row"> */}
                    {/* <div className="text-center">
                        <h2>{true ? "Add Task" : " Edit Task"}</h2>
                    </div> */}
                    <div className="col-12 p-4 " >
                        <div className="  d-flex flex-column">
                            <label htmlFor="title" className="my-2">
                                Enter Title
                            </label>
                            <input
                                type="text"
                                name="Title"
                                id="title"
                                placeholder="title"
                                className='my-1 p-2'
                                onChange={(e) => handleInputChange(e)}
                                value={addTask.Title}
                            />
                            {errors.Title && <div className="text-danger">{errors.Title}</div>}

                        </div>
                        <div className="w-100  d-flex flex-column">
                            <label className="my-2" htmlFor="description">
                                Enter Task Description
                            </label>
                            <input
                                type="text"
                                name="TaskDescription"
                                id="description"
                                placeholder="Description"
                                className="my-1 p-2"
                                onChange={(e) => handleInputChange(e)}
                                value={addTask.TaskDescription}
                            />
                            {errors.TaskDescription && <div className="text-danger ">{errors.TaskDescription}</div>}

                        </div>
                        {/* <div className="text-center"> */}
                        {!flag ? (
                            <button onClick={debounceHanlder} className="btn btn-primary my-2">Save</button>
                        ) : (
                            <button onClick={debounceHanlderEdit} className="btn btn-primary my-2">Update</button>
                        )}
                        {/* </div> */}
                    </div>
                    {/* </div> */}
                </div>
                <ToastContainer></ToastContainer>
            </div>

            <TaskList datafetcher={datafetcher} refetch={refetch} setFlag={setFlag} editClickedHanlder={editClickedHanlder} ></TaskList>
        </>
    )
}
