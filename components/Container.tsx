import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Box
      m="auto"
      pt={{ base: "1rem", md: "2rem", xl: "4rem" }}
      w={{ base: "90vw", md: "80vw", xl: "1024px" }}
    >
      <Header />
      {children}
    </Box>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [session, loading] = useSession();
  return (
    <Flex justify="space-between" align="center">
      <Heading as="h1" fontSize={{ base: "2rem", xl: "3rem" }}>
        Greg's Guestbook
      </Heading>
      {session && <Text>{session.user.name}</Text>}
      <HStack>
        {session ? (
          <Button
            onClick={() => signOut()}
            variant="outline"
            py="0.5rem"
            px="1rem"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
            isLoading={loading}
            variant="outline"
            py="0.5rem"
            px="1rem"
          >
            Login With Github
          </Button>
        )}
        <IconButton
          onClick={toggleColorMode}
          aria-label={
            colorMode === "light" ? "toggle dark mode" : "toggle light mode"
          }
          icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
        />
      </HStack>
    </Flex>
  );
};

export default Container;
