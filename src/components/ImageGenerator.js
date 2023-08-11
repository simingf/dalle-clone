import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const ImageGenerator = () => {
  const [description, setDescription] = useState("");
  const [resolution, setResolution] = useState("256x256");
  const [generatedImage, setGeneratedImage] = useState("");
  const [secretKey, setSecretKey] = useState(
    "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"
  );

  const handleResolutionChange = (event) => {
    const selectedResolution = event.target.value;
    setResolution(selectedResolution);
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: String(description),
          size: String(resolution),
          n: 1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );
      setGeneratedImage(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <TextField
            label="Secret Key"
            variant="outlined"
            fullWidth
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </CardContent>
        <CardContent>
          <TextField
            label="Image Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={handleGenerateImage}
            variant="contained"
            color="primary"
          >
            Generate Image
          </Button>
          <FormControl>
            <Select value={resolution} onChange={handleResolutionChange}>
              <MenuItem key="256x256" value="256x256">
                256x256
              </MenuItem>
              <MenuItem key="512x512" value="512x512">
                512x512
              </MenuItem>
            </Select>
          </FormControl>
        </CardActions>
        {generatedImage && (
          <CardMedia
            component="img"
            alt="Generated"
            height="auto"
            width="100%"
            src={generatedImage}
          />
        )}
      </Card>
    </Container>
  );
};

export default ImageGenerator;
