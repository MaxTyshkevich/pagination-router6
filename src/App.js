import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Pagination, TextField, Stack, Link } from "@mui/material";

const BASE_URL = `http://hn.algolia.com/api/v1/search?`;

function App() {
  const [posts, setPost] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0); // max count pages

  console.log(`page: `, page);

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      console.log(data);
      setPost(data.hits);
      setPageQty(data.nbPages);
    });
  }, [query, page]);

  return (
    <Container className="App" sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={({ target }) => {
          setQuery(target.value);
          setPage(1);
        }}
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
    </Container>
  );
}

export default App;
