import React from "react";
import { GetServerSideProps } from "next";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import Container from "../../components/Container";
import { Heading } from "@chakra-ui/layout";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  return (
    <Container>
      <Heading as="h2">{props.content}</Heading>
      <p>By {props?.author?.name || "Unknown author"}</p>
    </Container>
  );
};

export default Post;
