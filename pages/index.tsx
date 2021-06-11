import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Container from "../components/Container";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Heading, Flex, Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useSession } from "next-auth/client";
import { Textarea } from "@chakra-ui/textarea";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return { props: { feed } };
};

const SubmitPost = () => {
  const [content, setContent] = useState("");
  const [form, setForm] = useState<any>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setForm({ state: "loading" });

    try {
      const body = { content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setForm({ state: "success" });
      setContent("");
    } catch (error) {
      setForm({ state: "error" });
      setContent("");
      console.error(error);
    }
  };

  useEffect(() => {
    if (content) {
      setForm({ state: "" });
    }
  }, [content]);

  return (
    <Flex direction="column" mb="4rem" as="form" onSubmit={handleSubmit}>
      <FormControl id="message">
        <Textarea
          isRequired
          onChange={(e) => setContent(e.target.value)}
          value={content}
          rows={2}
          maxW="20rem"
          placeholder="Your message here..."
        />
      </FormControl>
      <Button
        disabled={!content}
        isLoading={form.state === "loading"}
        loadingText="Submitting..."
        type="submit"
        maxW="20rem"
        colorScheme={
          form.state === "success"
            ? "green"
            : form.state === "error"
            ? "red"
            : "linkedin"
        }
      >
        {form.state === "success" ? "Submitted!" : "Submit"}
      </Button>
    </Flex>
  );
};

type Props = {
  feed: PostProps[];
};

const Feed: React.FC<Props> = (props) => {
  const [session] = useSession();
  return (
    <Container>
      <Heading fontSize={{ base: "1rem", xl: "1.5rem" }} mt="3rem" mb="1rem">
        {session
          ? `Hi ${session.user.name}! Share a message below!`
          : `Sign in to share something!`}
      </Heading>
      {session && <SubmitPost />}
      <Heading mb="0.5rem" fontSize={{ base: "1.5rem", xl: "2rem" }} as="h2">
        Public Feed
      </Heading>
      <Box pt="1rem" as="ul">
        {props.feed.map((post) => <Post key={post.id} post={post} />).reverse()}
      </Box>
    </Container>
  );
};

export default Feed;
