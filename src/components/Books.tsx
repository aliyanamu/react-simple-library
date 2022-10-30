import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useEffect, useState } from "react";

import useView from "../utils/useView";
import Book, { BookType } from "./Book";

type BooksProps = {
  books: BookType[];
  size: number;
};

const Books: React.FC<BooksProps> = ({ books, size }) => {
  const { isMobileView, isDesktopView, isLargeScreenView } = useView();
  const [filteredBooks, setFilterBooks] = useState(books);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageChunk, setPageChunk] = useState<BookType[]>([]);
  const [query, setQuery] = useState("");

  const sliceBook = (page: number) => {
    let startIndex = page * size;
    let endIndex = (page + 1) * size;
    return filteredBooks.slice(startIndex, endIndex);
  };

  const onPaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageChunk(sliceBook(value - 1));
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSearchInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const filteredBooks = books.filter((book: any) =>
        book.title.toLowerCase().match(new RegExp(query.toLowerCase(), "g"))
      );
      setPage(1);
      setFilterBooks(filteredBooks);
    }
  };

  useEffect(() => {
    setCount(Math.ceil(filteredBooks.length / size));
    setPageChunk(sliceBook(page - 1));
  }, [filteredBooks, page]);

  return (
    <Stack flexGrow={1} margin="2.5rem 5%" spacing={1}>
      <Stack
        direction={isMobileView ? "column" : "row"}
        justifyContent={isMobileView ? "center" : "space-between"}
        alignItems="center"
        sx={{ flexFlow: "wrap", marginX: "2rem", rowGap: "1rem" }}
      >
        <Pagination
          count={count}
          page={page}
          color="primary"
          size={
            isLargeScreenView ? "large" : isDesktopView ? "medium" : "small"
          }
          onChange={onPaginationChange}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
        <TextField
          id="search-input"
          label="Search"
          size="small"
          value={query}
          onChange={onSearchInputChange}
          onKeyUp={onSearchInputKeyUp}
        />
      </Stack>
      <Grid container spacing={2} marginX="auto">
        {pageChunk?.map((book: any) => {
          return (
            <Grid
              key={book.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                paddingRight: "16px",
              }}
            >
              <Book book={book} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Books;
