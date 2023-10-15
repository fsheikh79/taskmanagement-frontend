import React from 'react'
import { useQuery } from 'react-query'
import { getmethod, deleteMethod } from '../apiinstance/apiinstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function TaskList({ setFlag, editClickedHanlder, debounceHanlder2 ,datafetcher,refetch}) {
   
    const deleteTaskHanlder = async (idfilter) => {
        try {
            const getToken = localStorage.getItem('Token')
            const response = await deleteMethod({
                url: `deleteTask/${idfilter}`,
                // body: JSON.stringify(addTask),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken
                }
            });
            if (response?.status === 201) {
                
                refetch()
                toast.success('Task is deleted successfully  ', {
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
        } catch (error) {
            console.log(error)
        }
    }
    
    const onClickHanlderedit = (Id) => {
        const filterData = datafetcher?.taskList?.filter(elem => elem.Id === Id)
        setFlag(true);
        editClickedHanlder(Id, filterData,refetch);
        // refetch()
    }


    return (


        <div className="container py-2 ">
            
            {datafetcher?.taskList?.map((elem, index) => {
                return (
                    <div
                        className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                       key={index}
                    >
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{elem.Title}</h4>
                                <p>{elem.TaskDescription}</p>
                            </div>
                            <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => onClickHanlderedit(elem.Id)}
                            >
                                Edit
                            </button>
                            
                            <button
                                className="btn btn-danger mx-2"
                                
                                onClick={() => deleteTaskHanlder(elem.Id)}
                            >
                                Delete
                            </button>

                            </div>
                           
                        </div>
                    </div>

                );
            })}
            <ToastContainer></ToastContainer>
        </div>


    )
}
