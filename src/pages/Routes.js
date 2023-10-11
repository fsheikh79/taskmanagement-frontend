import React,{  createContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import Login from './Login';
import Register from './Register';
import { QueryClientProvider, QueryClient } from 'react-query'
import NotFound from '../components/NotFound';

const queryClient = new QueryClient()
export const UseContext = createContext()
export default function PageRoutes() {
  
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        
      </Routes>
      </QueryClientProvider>
    </div>
  )
}
