import React from "react";
import { Text, Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const gray = useColorModeValue("gray.600", "gray.300");
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Box
      w="26.25rem"
      maxW="100%"
      borderRadius="md"
      listStyleType="none"
      as="li"
      p="1rem"
      mb="1rem"
      border="1px solid"
      borderColor="gray.300"
    >
      <Text fontSize="1.25rem">{post.content}</Text>
      <Text color={gray}>By {authorName}</Text>
    </Box>
  );
};

export default Post;
