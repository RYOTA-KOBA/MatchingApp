import React, { useCallback } from "react";
import ImagePreview from "./ImagePreview";
import { storage } from "../firebase";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  avatarIconButton: {
    width: "48px",
    height: "48px",
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ImageArea(props: any) {
  const classes = useStyles();

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = { id: fileName, path: downloadURL };
        props.setImages((prevState: any) => [...prevState, newImage]);
      });
    },
    [props.setImages]
  );

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter(
          (image: { id: any }) => image.id !== id
        );
        props.setImages(newImages);
        return storage.ref("images").child(id).delete();
      }
    },
    [props.images]
  );

  return (
    <div>
      <div>
        {props.images.map((image: { id: any; path: any }) => (
          <ImagePreview
            id={image.id}
            path={image.path}
            key={image.id}
            delete={deleteImage}
          />
        ))}
      </div>
      <div>
        <IconButton className={classes.avatarIconButton}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
}
