import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <div className='d-flex justify-content-evenly mt-2 ' style={{ marginRight: "2rem" }}>
                <h2>Task Management</h2>

                <button onClick={handlelogout} className="btn btn-primary my-2 ml-auto mr-auto">Logout</button>
            </div>

        </>
    )
}
