import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Button from "@mui/material/Button";
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
  const [bookmarks, setBookmarks] = useState<{ [key: string]: any }>({});
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
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

  const getAllBooks = (items: { [key: string]: any }) => {
    const bookmarkedBooks = books.map((book: BookType) => {
      if (items[book.category_id] && items[book.category_id][book.id]) {
        book.isBookmarked = true;
      } else {
        book.isBookmarked = false;
      }
      return book;
    });
    setFilterBooks(bookmarkedBooks);
  };

  const getOnlyBookmarkedBooks = (items: { [key: string]: any }) => {
    const bookmarkedBooks = books.reduce(
      (bookArray: BookType[], book: BookType) => {
        if (items[book.category_id] && items[book.category_id][book.id]) {
          bookArray.push(book);
        }
        return bookArray;
      },
      []
    );
    setFilterBooks(bookmarkedBooks);
  };

  const showOnlyBookmarked = (e: ChangeEvent<unknown>) => {
    const items = JSON.parse(localStorage.getItem("bookmarks") as string);
    if (onlyBookmarked) {
      getAllBooks(items);
    } else {
      getOnlyBookmarkedBooks(items);
    }
    setOnlyBookmarked(!onlyBookmarked);
    setPage(1);
    setQuery("");
  };

  const toggleBookmark = ({ category_id, id, isBookmarked }: BookType) => {
    const newBookmarks = bookmarks;
    if (isBookmarked) {
      delete newBookmarks[category_id][id];
      !Object.keys(newBookmarks[category_id]).length &&
        delete newBookmarks[category_id];
    } else if (newBookmarks[category_id]) {
      newBookmarks[category_id][id] = true;
    } else {
      newBookmarks[category_id] = { [id]: true };
    }
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
    if (!onlyBookmarked) {
      getAllBooks(newBookmarks);
    } else {
      getOnlyBookmarkedBooks(newBookmarks);
    }
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
      const regex = new RegExp(query.toLowerCase(), "g");
      const searchedBooks = filteredBooks.filter(
        (book: any) =>
          book.title.toLowerCase().match(regex) ||
          book.authors.join("_").toLowerCase().match(regex)
      );
      setPage(1);
      setFilterBooks(searchedBooks);
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("bookmarks") as string);
    items && setBookmarks(items);
    getAllBooks(items);
  }, []);

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
        sx={{ flexFlow: "wrap", marginX: "1rem", rowGap: "1rem" }}
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
      <Stack
        direction="row"
        justifyContent={isMobileView ? "center" : "flex-end"}
        alignItems="center"
        sx={{ paddingRight: !isMobileView ? "1rem" : "0px" }}
      >
        <Button
          variant={onlyBookmarked ? "contained" : "outlined"}
          startIcon={<BookmarkIcon />}
          onClick={showOnlyBookmarked}
        >
          Bookmark
        </Button>
      </Stack>
      <Grid container spacing={2} marginX="auto">
        {pageChunk?.map((book: BookType) => {
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
              <Book book={book} toggleBookmark={toggleBookmark} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Books;
