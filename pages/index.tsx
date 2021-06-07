import React from "react";
import { GetStaticProps } from "next";
import Container from "../components/Container";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Heading, Flex, Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

const Feed: React.FC<Props> = (props) => {
  return (
    <Container>
      <Heading
        mt="3rem"
        mb="0.5rem"
        fontSize={{ base: "1.5rem", xl: "2rem" }}
        as="h2"
      >
        Public Feed
      </Heading>
      <Text>Sign in to share something!</Text>
      <Box pt="2rem" as="ul">
        {props.feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
};

export default Feed;
