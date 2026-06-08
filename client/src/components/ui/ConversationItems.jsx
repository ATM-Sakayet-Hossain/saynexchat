import React from "react";
import { useDispatch } from "react-redux";
import { activeConversation } from "../../slices/ActiveConvSlice";

const ConversationItems = ({ profileData, myId }) => {
  const dispatch = useDispatch()
  console.log(profileData);
  
  const handelActiveConv = () => {
    if (profileData.creator._id == myId) {
      dispatch(activeConversation({...profileData.participent, convId: profileData._id}))
    } else {
      dispatch(activeConversation({...profileData.creator, convId: profileData._id}))
    }
  }
  return (
    <div onClick={handelActiveConv} className="flex items-center gap-2 cursor-pointer">
      <div className="w-10 h-10 border border-slate-100 bg-slate-400 rounded-full flex items-center justify-center">
        E
      </div>
      <div>
        <h2 className="text-base font-semibold">
          {profileData.creator._id == myId
            ? profileData.participent.fullName
            : profileData.creator.fullName}
        </h2>
        <p className="text-sm text-slate-300">
          {profileData.lastMessage || ""}
        </p>
      </div>
    </div>
  );
};

export default ConversationItems;
