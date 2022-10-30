import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { URL } from "../utils/constants";
import Books from "./Books";
import Categories from "./Categories";
import SnackBar from "./SnackBar";

const isInDevelopment = process.env.NODE_ENV === "development";
const categoriesURL = `${isInDevelopment ? URL.cors : ""}${URL.categories}`;
const booksURL = `${isInDevelopment ? URL.cors : ""}${URL.books}`;

const Directory: React.FC = () => {
  const hasOnceRendered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgOpen, setErrorMsgOpen] = useState(false);

  const changeCategory = (categoryId: number) => setCategoryId(categoryId);
  const closeErrorMsg = () => setErrorMsgOpen(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(categoriesURL);
      setCategories(data);
      setCategoryId(data[0]?.id);
    } catch ({ message }) {
      setErrorMsg(message as string);
      setErrorMsgOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooks = async (params: any) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(booksURL, { params });
      setBooks(data);
    } catch ({ message }) {
      setErrorMsg(message as string);
      setErrorMsgOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasOnceRendered.current) return;
    hasOnceRendered.current = true;
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    categoryId && fetchBooks({ categoryId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <>
      {!!errorMsg && (
        <SnackBar
          type="error"
          message={errorMsg}
          open={errorMsgOpen}
          onClose={closeErrorMsg}
        />
      )}
      {!isLoading && categories && (
        <Categories
          currCategoryId={categoryId}
          categories={categories}
          onChangeCategory={changeCategory}
        />
      )}
      {!isLoading && books && <Books books={books} size={10} />}
      {isLoading && (
        <Stack direction="row" mt="10rem" justifyContent="center">
          <CircularProgress size={100} />
        </Stack>
      )}
    </>
  );
};

export default Directory;
