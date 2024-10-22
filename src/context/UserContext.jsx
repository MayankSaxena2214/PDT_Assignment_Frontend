import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { server } from "../main";
import toast from "react-hot-toast";
const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState([]);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [match,setMatch]=useState([]);
    const [players,setPlayers]=useState([]);
    const [myTeams,setMyTeams]=useState([]);
    async function login(email,password,navigate){
        try{
            const response=await axios.post(`${server}/api/v1/users/login`,{email,password});
            // console.log(response);
            setUser(response.data.user);
            setIsAuthenticated(true);
            toast.success(response.data.message);
            console.log("Is authenticated is ",isAuthenticated);
            localStorage.setItem("token",response.data.token);
            navigate("/")
            window.location.reload();
        }
        catch(error){
            console.log(error);
            setIsAuthenticated(false);
            setUser([]);
            toast.error(error.response.data.message);
        }
    }
    async function register(name,email,password,navigate) {
        try{
            const response=await axios.post(`${server}/api/v1/users/register`,{name,email,password});
            // console.log(response);
            setUser(response.data.user);
            
            toast.success(response.data.message);
            navigate("/login")
        }
        catch(error){
            console.log(error);
            setUser([]);
            toast.error(error.response.data.message);
        }
    }
    async function fetchUser(){
        try{
            const response=await axios.get(`${server}/api/v1/users/getUser`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
            setUser(response.data.user);
            console.log(response.data.user);
            setIsAuthenticated(true);
        }
        catch(error){
            console.log(error);
            setIsAuthenticated(false);
        }
    }
    async function fetchMatches(){
        try{
            const response=await axios.get(`${server}/api/v1/match/getMatches`);
            setMatch(response.data.matches);
        }
        catch(error){
            console.log(error);
        }
    }
    async function getPlayers(){
        try{
            const response=await axios.get(`${server}/api/v1/players/getAll`);
            setPlayers(response.data.players)
        }
        catch(error){
            console.log(error);
        }
    }
    async function fetchMyTeams(){
        try{
            const response=await axios.get(`${server}/api/v1/teams/getMyTeams`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
            setMyTeams(response.data.teams);
        }
        catch(error){
            console.log(error);
        }
    }
    async function logout(){
        try{
            localStorage.clear();
            setIsAuthenticated(false);
            setUser([]);
            setMyTeams([]);
            toast.success("Logged Out Successfully");
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchUser();
        fetchMatches();
        getPlayers();
        fetchMyTeams();
    },[])
    return <UserContext.Provider value={{login,logout,register,isAuthenticated,user,match,players,myTeams}}>
        {children}
    </UserContext.Provider>
}

export const UserData=()=>useContext(UserContext);