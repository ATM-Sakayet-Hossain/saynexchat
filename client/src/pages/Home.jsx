import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyGetMessagesQuery, useSendMessageMutation } from "../lib/api";
import { initSocket } from "../lib/socketApi";

const Home = () => {
  const messageList = useSelector((state)=> state.messages.messagesList)
  const [message, setMessage] = useState("")
  const [sendMessage] = useSendMessageMutation()
  const [messagesTriggered] = useLazyGetMessagesQuery()
  const participentData = useSelector((state) => state.activeConv.active)

  useEffect(() => {
    if (participentData?.convId) {
      messagesTriggered(participentData?.convId)
    }
  }, [participentData])

  if (!participentData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl">Start Conversation</p>
      </div>
    )
  }

  const handelSendMessage = () => {
    sendMessage({
      content: message,
      conversation: participentData.convId
    })
  }
  return (
    <div className="w-full h-screen bg-slate-100 dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
              {participentData.fullName}
            </h2>
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Online
            </div>
          </div>
        </div>
        <div
          className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
          id="chatDisplay"
        >
          {
            messageList?.map((item) => {
              return item.sender === participentData._id
                ?
                (<div key={item._id} className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
                  {item.content}
                </div>)
                :
                (<div key={item._id} className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
                  {item.content}
                </div>)
            }
            )
          }
        </div>
        <div className="px-3 py-2 border-t dark:border-zinc-700 mt-auto">
          <div className="flex gap-2">
            <input
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
              id="chatInput"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handelSendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
              id="sendButton"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
