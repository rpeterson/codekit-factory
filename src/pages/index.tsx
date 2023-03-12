// import styles from "./index.module.css";
import { type NextPage } from "next";
// import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
import {
  Box,
  Heading,
  Flex,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { api } from "@codekit/studio/utils/api";
import { ShellWithNavbar } from "@codekit/studio/components/ShellWithNavbar";
import { CreateAppForm } from "@codekit/studio/forms/createApp";
import { useRouter } from "next/router";

const Home: NextPage = (props) => {
  const router = useRouter();
  const { data: apps } = api.apps.getAll.useQuery();
  const handleCreateApp = api.apps.createApp.useMutation();
  return (
    <>
      <ShellWithNavbar>
        <VStack w="100vw">
          <Flex justifyContent="flex-end" w="100%" padding="1em">
            <Link
              href={{
                query: { modal: "new" },
              }}
            >
              <Button>Create App</Button>
            </Link>
          </Flex>
          <HStack>
            {apps?.map((app) => (
              <Box key={app.id} h="36" w="72" bg="bg-surface" boxShadow="sm" borderRadius="lg" bgColor="#FFF" p="1em">
                <Heading size="md">{app.name}</Heading>
                <Heading size="xs">{app.subdomain}.{app.domain}</Heading>
                <Flex h="auto" justifyContent="flex-end">
                  <Link href={`/apps/${app.id}`}><Button>Edit</Button></Link>
                </Flex>
              </Box>
            ))}
          </HStack>
        </VStack>
      </ShellWithNavbar>
      <Modal
        isOpen={router?.query?.modal === "new"}
        onClose={() => router.back()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create App</ModalHeader>
          <ModalBody>
            <CreateAppForm onSubmit={handleCreateApp.mutate} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
