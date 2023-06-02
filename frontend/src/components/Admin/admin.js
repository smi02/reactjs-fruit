import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { createAxios } from "../../redux/createInstance";
import { loginSuccess } from "../../redux/authSlice";

const Admin = () => {
  const user = useSelector((state)=>state.auth.login?.currentUser);
  const userList= useSelector((state)=> state.users.users?.allUsers);
  const msg = useSelector((state)=>state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleDelete = (id)=>{
      deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
    if(user?.accessToken){
    getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  },[]);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? `admin` : `User` }`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={()=> handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
  );
};

export default Admin;
