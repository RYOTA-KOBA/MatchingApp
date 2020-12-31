import React from "react";

type imageProps = {
  id: string;
  path: string;
  delete: any;
};

export default function ImagePreview(props: imageProps) {
  return (
    <div className="p-media__icon" onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </div>
  );
}
