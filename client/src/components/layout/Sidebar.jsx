import React, { useEffect } from "react";
import ConversationItems from "../ui/ConversationItems";
import { useGetConversationsQuery } from "../../lib/api";
import { socket } from "../../lib/socketApi";

const Sidebar = ({ profile }) => {
  const { data, isFetching } = useGetConversationsQuery();


  useEffect(() => {
    if (data) {
      data.forEach(conv => {
        socket.emit("join_room", conv._id)
      });
    }
  }, [data])
  return (
    <div className="h-screen w-full max-w-52 flex flex-col text-white p-5 bg-blue-600">
      <h1 className="font-bold text-2xl">ChatAPP</h1>
      <div className="mt-10 space-y-4">
        {data?.map((item) => (
          <ConversationItems
            key={item._id}
            profileData={item}
            myId={profile._id}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 cursor-pointer border-t border-b py-4">
        <div className="w-10 h-10 border border-slate-100 bg-slate-400 rounded-full flex items-center justify-center">
          E
        </div>
        <div>
          <h2 className="text-base font-semibold">{profile?.fullName}</h2>
        </div>
      </div>
      <div className="">Log Out</div>
    </div>
  );
};

export default Sidebar;
