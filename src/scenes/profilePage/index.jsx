import { Box, useMediaQuery } from "@mui/material";
import { GET_USER_API } from "endpoints";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { _id } = useSelector(state => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_USER_API}/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if(!response.ok){
        toast.error(data.message);
        return;
    }
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='2rem'
        justifyContent={"center"}
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined} // tells the width of this flex item
        >
          <UserWidget userId={userId} picturePath={user?.picturePath} />
          <Box margin={"2rem 0"} />
          <FriendListWidget userId = {_id} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined} // tells the width of this flex item
          mt = {isNonMobileScreens ? 0 : 2}
        >
            <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  )
};

export default ProfilePage;
