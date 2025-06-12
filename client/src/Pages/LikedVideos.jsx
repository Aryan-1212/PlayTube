import React from "react";
import { VideoCardHorizontal } from "../Components";
import { MdOutlineAutoDelete } from "react-icons/md";

function LikedVideos() {
  const videoProps = {
    thumbnail: "",
    title: "Test",
    ownerName: "Aryan",
    OwnerAvatar: "",
    views: "12k",
    uploadedAt: "2 days ago",
    description: "This is description",
  };
  return (
    <div className="p-3">
      <div className="flex w-5/6 justify-between">
        <h1 className="text-4xl">Liked Videos</h1>
      </div>
      <div className="my-10">
        <div>
          <VideoCardHorizontal video={videoProps} />
          <VideoCardHorizontal video={videoProps} />
          <VideoCardHorizontal video={videoProps} />
          <VideoCardHorizontal video={videoProps} />
        </div>
      </div>
    </div>
  );
}

export default LikedVideos;
