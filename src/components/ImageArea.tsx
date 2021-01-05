import React, { useCallback, useEffect } from "react";
import ImagePreview from "./ImagePreview";
import { db, storage } from "../firebase";

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

type imageProps = {
  id: string;
  path: string;
};

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

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages((prevState: any) => [...prevState, newImage]);
        });
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
          (image: { id: string }) => image.id !== id
        );
        props.setImages(newImages);
        return storage.ref("images").child(id).delete();
      }
    },
    [props.images]
  );

  useEffect(() => {
    db.collection("users")
      .doc(props.uid)
      .get()
      .then((snapshot: any) => {
        const data = snapshot.data();
        if (data.images) {
          props.setImages(data.images);
        }
      });
  }, [props.setImages]);

  return (
    <div>
      <div>
        {props.images.length > 0 &&
          props.images.map((image: imageProps) => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div>
        {!(props.images.length > 0) && (
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
        )}
        {props.images.length > 0 && (
          <p className="p-userprofile__images__edit">
            ※画像を削除したい場合は表示されている画像をクリックしてください
          </p>
        )}
      </div>
    </div>
  );
}
