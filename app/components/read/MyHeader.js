import {
  Burger,
  Center,
  ColorScheme,
  Flex,
  Group,
  AppShell,
  Image,
  Switch,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { SearchControl } from "./SearchControl";

const MyHeader = ({
  colorScheme,
  toggleColorScheme,
  opened,
  setOpened,
  open,
}) => {
  const theme = useMantineTheme();
  return (
    <AppShell.Header height={56}>
      <Center
        h={56}
        px={10}
        mx="auto"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Flex sx={{ justifyContent: "start", alignItems: "center" }}>
          
          <Title
            order={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              height={30}
              width="auto"
              fit="contain"
              radius="md"
              src="./icon.svg"
              alt="Logo"
            />{" "}
            Reactive Bible
          </Title>
        </Flex>
        
        <Group position="center" my={30}>
          <Switch
            checked={colorScheme === "dark"}
            onChange={toggleColorScheme}
            size="lg"
            onLabel={
              <IconSun color={theme.white} size="1.25rem" stroke={1.5} />
            }
            offLabel={
              <IconMoonStars
                color={theme.colors.gray[6]}
                size="1.25rem"
                stroke={1.5}
              />
            }
          />
        </Group>
      </Center>
    </AppShell.Header>
  );
};

export default MyHeader;
