import React from "react";
import { VideoCardHorizontal } from "../Components";
import { MdOutlineAutoDelete } from "react-icons/md";

function History() {
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
        <h1 className="text-4xl">Watch History</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:bg-[#2a2a31] cursor-pointer transition">
          Clear Watch History <MdOutlineAutoDelete className="text-xl" />
        </button>
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

export default History;
