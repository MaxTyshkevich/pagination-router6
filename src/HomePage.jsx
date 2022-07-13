import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Pagination, TextField, Stack, Link } from "@mui/material";

const BASE_URL = `http://hn.algolia.com/api/v1/search?`;

const useDelay = (req, ms = 500) => {
  const [query, setQuery] = useState(req);

  useEffect(() => {
    const id = setTimeout(() => setQuery(req), ms);

    return () => clearTimeout(id);
  }, [ms, req]);

  return query;
};

export const HomePage = () => {
  const [posts, setPost] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  // max count pages
  const delayQuery = useDelay(query);

  const handleChangeQuery = ({ target }) => {
    setQuery(target.value);
    setPage(1);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + `query=${delayQuery}&page=${page - 1}`)
      .then(({ data }) => {
        setPost(data.hits);
        setPageQty(data.nbPages);
      });
  }, [delayQuery, page]);

  return (
    <>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={handleChangeQuery}
      />

      <Stack spacing={2} sx={{ mt: 2 }}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            sx={{ mx: "auto" }}
          />
        )}

        {posts.map((post) => (
          <Link key={post.objectID} href={post.url}>
            {post.title || post.story_title}
          </Link>
        ))}
      </Stack>
    </>
  );
};
