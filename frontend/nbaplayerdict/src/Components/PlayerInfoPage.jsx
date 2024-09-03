import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

function PlayerInfoPage() {
  const { searchInput } = useParams(); // Extract the searchInput from the URL
  const [playerData, setPlayerData] = useState(null);
  const [noPlayerFound, setNoPlayerFound] = useState(false);
  const [open, setOpen] = useState(false); // State to handle modal open/close

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/search?query=${encodeURIComponent(searchInput)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayerData(data);
        setNoPlayerFound(!data || !data.data);
      } catch (error) {
        console.error("Error fetching player data: ", error);
      }
    };

    fetchPlayerData();
  }, [searchInput]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        {noPlayerFound ? (
          <Typography variant="h6" color="error">
            No player found
          </Typography>
        ) : (
          playerData && playerData.data && (
            <Card sx={{ width: "100%", padding: 2 }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  {`${playerData.data.first_name} ${playerData.data.last_name}`}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Team:</strong> {`${playerData.data.team.full_name} (${playerData.data.team.abbreviation})`}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Position:</strong> {playerData.data.position}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Jersey Number:</strong> {playerData.data.jersey_number}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Height:</strong> {playerData.data.height}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Weight:</strong> {playerData.data.weight}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>College:</strong> {playerData.data.college}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Country:</strong> {playerData.data.country}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Draft Year:</strong> {playerData.data.draft_year}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Draft Round:</strong> {playerData.data.draft_round}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Draft Number:</strong> {playerData.data.draft_number}
                </Typography>
                
                {/* View Player Stats Button */}
                <Button 
                  variant="contained" 
                  color="warning" 
                  onClick={handleClickOpen}
                  sx={{ marginTop: 2 }}
                >
                  View Player Stats
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </Box>

      {/* Modal for Player Stats */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{`${playerData?.data?.first_name} ${playerData?.data?.last_name} - Stats`}</DialogTitle>
        <DialogContent>
          {/* Content for player stats can go here */}
          <Typography variant="body1">
            Here, you can display detailed stats about the player. This might include career averages, recent game performance, etc.
          </Typography>
          {/* Close Button */}
          <Button onClick={handleClose} sx={{ marginTop: 2 }} variant="contained" color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default PlayerInfoPage;