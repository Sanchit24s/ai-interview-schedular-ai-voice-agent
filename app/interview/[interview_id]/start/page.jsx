"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const [activeUser, setActiveUser] = useState(false);
    const [callStarted, setCallStarted] = useState(false);
    const [conversation, setConversation] = useState(null);
    const { interview_id } = useParams();
    const router = useRouter();
    const conversationRef = useRef(null);

    useEffect(() => {
        startCall();
    }, [interviewInfo]);

    const startCall = () => {
        let questionList = "";
        interviewInfo?.interviewData?.questionList.forEach(
            (item) => (questionList += item?.question + ", ")
        );

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
                        You are an AI voice assistant conducting interviews.
                        Your job is to ask candidates provided interview questions, setting a relaxed yet professional tone. Example: 
                        "Hey there!, Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
                        Ask one question at a time and wait for the candidate's response before proceeding. 
                        Keep the questions clear and concise. Below are the questions ask one by one:
                        Questions: ${questionList}
                        If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example: 
                        "Need a hint? Think about how React tracks component updates!"
                        Provide brief, encouraging feedback after each answer. Example: 
                        "Nice! That's a solid answer."
                        "Hmm, not quite! Want to try again?"
                        Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
                        After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example: 
                        "That was great! You handled some tough questions well. Keep sharpening you skills!"
                        End on a positive note:
                        "Thanks for chatting! Hope to see you crushing projects soon!"
                        Key Guidelines:
                        ✅ Be friendly, engaging, and witty 🎤
                        ✅ Keep responses short and natural, like a real conversation
                        ✅ Adapt based on the candidate's confidence level
                        ✅ Ensure the interview remains focused on React 
                        `.trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions);
    };

    const stopInterview = () => {
        try {
            vapi.stop();
        } catch (err) {
            if (
                err.message?.includes("Meeting ended due to ejection") ||
                err?.toString()?.includes("Meeting has ended")
            ) {
                // Suppress this error
                console.log("Meeting ended gracefully.");
            } else {
                // Log unexpected errors
                console.error("Unexpected error:", err);
            }
        }
    };

    // vapi.on("call-start", () => {
    //     console.log("Call has started...");
    //     setCallStarted(true);
    //     toast("Call connected...");
    // });

    // vapi.on("speech-start", () => {
    //     console.log("Assistant speech has started.");
    //     setActiveUser(true);
    // });

    // vapi.on("speech-end", () => {
    //     console.log("Assistant speech has ended.");
    //     setActiveUser(false);
    // });

    // vapi.on("call-end", () => {
    //     console.log("Call has ended...");
    //     GenerateFeedback();
    //     toast("Interview ended...");
    // });

    // vapi.on("message", (message) => {
    //     if (message?.conversation) {
    //         console.log("Message conversation:", message?.conversation);
    //         setConversation(message?.conversation);
    //     }
    // });

    useEffect(() => {
        const handleMessage = (message) => {
            console.log("Messages", message);
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                conversationRef.current = convoString;
                console.log("ConvoString", convoString);
                setConversation(convoString);
            }
        };

        vapi.on("message", handleMessage);
        vapi.on("call-start", () => {
            console.log("Call has started...");
            setCallStarted(true);
            toast("Call connected...");
        });

        vapi.on("speech-start", () => {
            console.log("Assistant speech has started.");
            setActiveUser(true);
        });

        vapi.on("speech-end", () => {
            console.log("Assistant speech has ended.");
            setActiveUser(false);
        });

        vapi.on("call-end", () => {
            console.log("Call has ended...");
            GenerateFeedback();
            toast("Interview ended...");
        });

        return () => {
            vapi.off("message", handleMessage);
            vapi.off("call-start", () => console.log("END"));
            vapi.off("speech-start", () => console.log("END"));
            vapi.off("speech-end", () => console.log("END"));
            vapi.off("call-end", () => console.log("END"));
        };
    }, []);

    const GenerateFeedback = async () => {
        const convo = conversationRef.current;

        console.log("conversation at feedback", convo);

        if (!convo) {
            console.warn("No conversation data available for feedback.");
            return;
        }

        try {
            const result = await axios.post("/api/ai-feedback", {
                conversation: convo,
            });

            const content = result.data.content;
            const finalContent = content.replace(/```json|```/g, "").trim();
            console.log("Final Feedback:", finalContent);

            const { data, error } = await supabase
                .from("Interview-feedback")
                .insert([
                    {
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        interview_id: interview_id,
                        feedback: JSON.parse(finalContent),
                        recommended: false,
                    },
                ])
                .select();

            console.log(data);
            router.replace("/interview/" + interview_id + "/completed");
        } catch (error) {
            console.error("Error generating feedback:", error);
        }
    };

    return (
        <div className="p-20 lg:px-48 xl:px-56">
            <h2 className="font-bold text-xl flex justify-between">
                AI Interview Session
                <span className="flex gap-2 items-center">
                    <Timer />
                    <TimerComponent start={callStarted} />
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
                <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
                    <div className="relative">
                        {activeUser && (
                            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                        )}
                        <Image
                            src={"/ai.png"}
                            alt="ai"
                            width={100}
                            height={100}
                            className="w-[60px] h-[60px] rounded-full object-cover"
                        />
                    </div>
                    <h2>AI Recruiter</h2>
                </div>
                <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
                    <div className="relative">
                        {activeUser && (
                            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                        )}
                        <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
                            {interviewInfo?.userName[0]}
                        </h2>
                    </div>

                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className="flex items-center gap-5 justify-center mt-7">
                <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
                <AlertConfirmation stopInterview={stopInterview}>
                    <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
                </AlertConfirmation>
            </div>
            <h2 className="text-sm text-gray-400 text-center mt-5">
                Interview in progress...
            </h2>
        </div>
    );
}

export default StartInterview;
