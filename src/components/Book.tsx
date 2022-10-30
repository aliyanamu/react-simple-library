import BookmarkIcon from "@mui/icons-material/Bookmark";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

const ellipsisStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
};

export type BookType = {
  id: string;
  category_id: string;
  cover_url: string;
  title: string;
  authors: string[];
  description: string;
  isBookmarked?: boolean;
};

type BookProps = {
  book: BookType;
  toggleBookmark: (book: BookType) => void;
};

const Book: React.FC<BookProps> = ({ book, toggleBookmark }) => {
  return (
    <Card sx={{ width: 280 }}>
      <CardMedia
        component="img"
        height="190"
        image={book.cover_url}
        alt={book.title}
      />
      <CardContent sx={{ height: 120 }}>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            ...ellipsisStyle,
            WebkitLineClamp: "2",
          }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            ...ellipsisStyle,
            WebkitLineClamp: "1",
          }}
        >
          {book.authors.join(", ")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            ...ellipsisStyle,
            WebkitLineClamp: "2",
          }}
        >
          {book.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to bookmark"
          onClick={() => toggleBookmark(book)}
          sx={{ color: "#C9C9C9" }}
        >
          <BookmarkIcon color={book.isBookmarked ? "primary" : "inherit"} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Book;
