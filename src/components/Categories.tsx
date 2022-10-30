import Chip from "@mui/material/Chip";
import React from "react";
import useView from "../utils/useView";
import { HorizontalScrollContainer } from "./ScrollContainer";

type CategoriesProps = {
  currCategoryId: number | null;
  categories: any[];
  onChangeCategory: (value: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  currCategoryId,
  categories,
  onChangeCategory,
}) => {
  const { isDesktopView, isLargeScreenView } = useView();

  return (
    <HorizontalScrollContainer
      maxWidth={isLargeScreenView ? "lg" : isDesktopView ? "md" : "sm"}
    >
      {categories?.map((cat: any) => {
        return (
          <Chip
            key={cat.id}
            label={cat.name}
            color="primary"
            variant={currCategoryId === cat.id ? "filled" : "outlined"}
            sx={{ fontSize: "1rem", padding: "0.5rem" }}
            onClick={() => onChangeCategory(cat.id)}
          />
        );
      })}
    </HorizontalScrollContainer>
  );
};

export default Categories;
