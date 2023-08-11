import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const ImageGenerator = () => {
  const [description, setDescription] = useState("");
  const [resolution, setResolution] = useState("256x256");
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [secretKey, setSecretKey] = useState("");

  const handleResolutionChange = (event) => {
    const selectedResolution = event.target.value;
    setResolution(selectedResolution);
  };

  const handleCountChange = (event) => {
    const selectedCount = event.target.value;
    setCount(selectedCount);
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: String(description),
          size: String(resolution),
          n: parseInt(count),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );
      console.log(response.data.data);
      setImages(response.data.data);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Card>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: "1rem",
        }}
      >
        AI Image Generator
      </Typography>
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
          style={{
            marginLeft: "0.5rem",
            marginRight: "1rem",
          }}
        >
          Generate Image
        </Button>
        <FormControl>
          <p style={{ padding: 0, margin: 0 }}>Image Resolution</p>
          <Select value={resolution} onChange={handleResolutionChange}>
            {["256x256", "512x512", "1024x1024"].map((str) => (
              <MenuItem key={str} value={str}>
                {str}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <p style={{ padding: 0, margin: 0 }}>Number of Images</p>
          <Select value={count} onChange={handleCountChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardActions>
      {images.map((obj) => (
        <CardMedia
          key={obj.url}
          component="img"
          alt="Generated Image"
          height="auto"
          width="100%"
          src={obj.url}
        />
      ))}
    </Card>
  );
};

export default ImageGenerator;
