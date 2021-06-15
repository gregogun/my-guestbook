import React from "react";
import { Text, Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { parseISO, format } from "date-fns";

export type PostProps = {
  id: number;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const Post: React.FC<{ post: any }> = ({ post }) => {
  const gray = useColorModeValue("gray.300", "gray.700");
  const authorName = post.author ? post.author.name : "Unknown author";

  const formatDate = (date) => {
    return format(date, "d MMM yyyy 'at' h:mm bb");
  };

  const dateTime = post.updatedAt
    ? formatDate(post.updatedAt)
    : formatDate(post.createdAt);

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
      borderColor={gray}
    >
      <Text fontSize="1.25rem">{post.content}</Text>
      <Text color="gray.500">
        {authorName} / {dateTime}
      </Text>
    </Box>
  );
};

export default Post;
