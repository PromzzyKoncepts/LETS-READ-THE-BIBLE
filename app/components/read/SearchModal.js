import { forwardRef } from "react";
import { IconSearch } from "@tabler/icons-react";
import {
  Text,
  Group,
  rem,
  Modal,
  useMantineTheme,
  Autocomplete,
  Box,
  SelectItemProps,
} from "@mantine/core";
import { useBibleStore } from "./store";
import { Book, data } from "./readApi";

const searchData = data.map((book) => ({ ...book, value: book.text }));


const AutoCompleteItem = forwardRef((props, ref) => {
  const { chapter, verse, book_id, value, ...others } = props;

  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Box>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed" style={{ lineHeight: 1 }}>
            {`${book_id} ${chapter}:${verse}`}
          </Text>
        </Box>
      </Group>
    </div>
  );
});

// Add display name for debugging
AutoCompleteItem.displayName = "AutoCompleteItem";


export function SearchModal({
  opened,
  close,
}) {
  const theme = useMantineTheme();
  const setActiveBook = useBibleStore((state) => state.setActiveBook);
  const setActiveBookShort = useBibleStore((state) => state.setActiveBookShort);
  const setActiveChapter = useBibleStore((state) => state.setActiveChapter);
  const setActiveVerse = useBibleStore((state) => state.setActiveVerse);

  return (
    <Modal
      opened={opened}
      onClose={close}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      size="xl"
      styles={{ body: { minHeight: "435px" } }}
    >
      <Autocomplete
        icon={<IconSearch size={rem(16)} />}
        itemcomponent={AutoCompleteItem}
        placeholder="Search Bible"
        data={searchData}
        transitionprops={{
          transition: "pop-top-left",
          duration: 80,
          timingFunction: "ease",
        }}
        limit={7}
        // onItemSubmit={(item) => {
        //   setActiveBook(item.book_name);
        //   setActiveBookShort(item.book_id);
        //   setActiveChapter(item.chapter);
        //   setActiveVerse(item.verse);
        //   close();
        // }}
      />
    </Modal>
  );
}
