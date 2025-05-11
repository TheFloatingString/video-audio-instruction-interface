"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from 'axios'


type Message = {
  sender: "user" | "robot"
  text: string
}

export function SectionCards() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [robotAction, setRobotAction] = useState("")
  const [videoFeedInfo, setVideoFeedInfo] = useState("")
  const [robotState, setRobotState] = useState("")
  const [headCamera, setHeadCamera] = useState("")
  const [mostRecentMessage, setMostRecentMessage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {

      const fetchRobotAction = async () => {
        try {
          const response = await axios.get("https://desktop-dtohfqr.taile61ba3.ts.net/")
          setRobotAction(response.data.action) // assuming response is { info: 'Camera info data' }
        } catch (error) {
          console.error("Error fetching camera info:", error)
          setRobotAction("Error fetching data")
        }
      }
  
      const fetchVideoFeedInfo = async () => {
        try {
          const response = await axios.get("https://desktop-dtohfqr.taile61ba3.ts.net/")
          setVideoFeedInfo(response.data.action) // assuming response is { info: 'Camera info data' }
        } catch (error) {
          console.error("Error fetching camera info:", error)
          setVideoFeedInfo("Error fetching data")
        }
      }

      const fetchMostRecentMessage = async () => {
        try {
          const response = await axios.get("https://desktop-dtohfqr.taile61ba3.ts.net/")
          setMostRecentMessage(response.data.most_recent_message) // assuming response is { info: 'Camera info data' }
        } catch (error) {
          console.error("Error fetching camera info:", error)
          setVideoFeedInfo("Error fetching data")
        }
      }

      const fetchRobotState = async () => {
        try {
          const response = await axios.get("https://desktop-dtohfqr.taile61ba3.ts.net/api/robot_state")
          setRobotState(response.data.info) // assuming response is { info: 'Camera info data' }
        } catch (error) {
          console.error("Error fetching camera info:", error)
          setRobotState("Error fetching data")
        }
      }


      const fetchConvo = async () => {
        try {
          const response = await axios.get("https://desktop-dtohfqr.taile61ba3.ts.net/")
          console.log(response.data.convo)
          setConversation(response.data.convo) // assuming response is { info: 'Camera info data' }
        } catch (error) {
          console.error("Error fetching camera info:", error)
          setConversation([])
        }
      }

      fetchVideoFeedInfo()
      fetchRobotAction()
      fetchRobotState()
      fetchMostRecentMessage()
      fetchConvo()

      const time = new Date().toLocaleTimeString()

      // const newMessages: Message[] = [
      //   { sender: "user", text: `Hello @ ${time}` },
      //   { sender: "robot", text: `Acknowledged @ ${time}` },
      // ]

      // setConversation([
      //   {sender:"user", text:"how are you?"}
      // ])

      // setConversation(prev => {
      //   const updated = [...prev, ...newMessages]
      //   return updated.slice(-10) // Keep last 10 messages
      // })

      // setVideoFeedInfo(`Feed OK @ ${time}`)
      // setRobotState(`Idle`)
      // setHeadCamera(`Cam: ${Math.random().toFixed(3)}`)
    }, 1000) // slower for readability

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Head Camera */}
      <Card className="@container/card row-span-2">
        <CardHeader>
          <CardDescription>Head Camera</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <img
            src="http://localhost:8000/stream"
            alt="Robot Cam"
            className="w-full h-full object-cover rounded-md"
          />

          </CardTitle>
        </CardHeader>
      </Card>

      {/* Conversation with bubbles */}
      <Card className="@container/card row-span-2">
        <CardHeader>
          <CardDescription>Conversation</CardDescription>
        </CardHeader>
        <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2 text-sm max-w-xs break-words shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      </Card>

      {/* Robot Action */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Robot Action</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {robotAction}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Video Feed Info */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Video Feed Info</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {videoFeedInfo}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Robot State */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Robot State</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {robotState}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Robot State */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Most Recent Message</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {mostRecentMessage}
          </CardTitle>
        </CardHeader>
      </Card>

    </div>
  )
}
