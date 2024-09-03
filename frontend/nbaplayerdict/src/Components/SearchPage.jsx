import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/player/${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          NBA Stats Reference
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Search for a player"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ width: "100%" }}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
}

export default SearchPage;