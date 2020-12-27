import React from "react";

export default function ImagePreview(props: any) {
  return (
    <div className="p-media__icon" onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </div>
  );
}
