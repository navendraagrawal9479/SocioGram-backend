import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { ADD_COMMENT_API, GET_INDIVIDUAL_POST } from "endpoints";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "scenes/navbar";
import CommentsWidget from "scenes/widgets/CommentsWidget";
import MyCommentWidget from "scenes/widgets/MyCommentWidget";
import PostWidget from "scenes/widgets/PostWidget";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.dark;

  const getPost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_INDIVIDUAL_POST.replace(
        "postId",
        postId
      )}`,
      {
        method: "GET",
        header: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error("Post not found.");
      return;
    }

    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) {
    return <Typography variant='h2'>No Post Found.</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Box flexBasis={isNonMobileScreens ? "50%" : undefined} p={0}>
          <PostWidget
            postId={postId}
            postUserId={post?.userId}
            name={`${post?.firstName} ${post?.lastName}`}
            description={post?.description}
            location={post?.location}
            picturePath={post?.picturePath}
            userPicturePath={post?.userPicturePath}
            likes={post?.likes}
            comments={post?.comments}
          />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "45%" : undefined}>
          <MyCommentWidget
            _id={_id}
            postUserId={post?.userId}
            postId={postId}
          />
        </Box>
      </Box>
    </>
  );
};

export default PostPage;
