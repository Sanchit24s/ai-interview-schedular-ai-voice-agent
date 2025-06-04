import {
    BriefcaseBusinessIcon,
    Calendar,
    Code2Icon,
    Component,
    LayoutDashboard,
    List,
    Puzzle,
    Settings,
    User2Icon,
    WalletCards,
} from "lucide-react";

export const SideBarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Scheduled Interview",
        icon: Calendar,
        path: "/scheduled-interview",
    },
    {
        name: "All Interview",
        icon: List,
        path: "/all-interview",
    },
    {
        name: "Billing",
        icon: WalletCards,
        path: "/billing",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

export const InterviewType = [
    {
        title: "Technical",
        icon: Code2Icon,
    },
    {
        title: "Behavioral",
        icon: User2Icon,
    },
    {
        title: "Experience",
        icon: BriefcaseBusinessIcon,
    },
    {
        title: "Problem Solving",
        icon: Puzzle,
    },
    {
        title: "Leadership",
        icon: Component,
    },
];

export const QUESTINS_PROMPT = `You are an expert technical interviewer.
        Based on the following inputs, generate a well-structured list of high-quality interview questions:
        Job Title: {{jobTitle}}
        Job Description: {{jobDescription}}
        Interview Duration: {{duration}}
        Interview Type:{{type}}
        Your task:
        Analyze the job description to identify key responsibilities, required skills, and expected experience. 
        Generate a list of interview questions depends on interview duration
        Adjust the number and depth of questions to match the interview durations.
        Ensure the questions match the tone and structure of a real-lie {{type}} interview.
        Format your response in JSON format with array list of questions.
        format: interviewQuestions=[
        {
            question:'',
            type:'Technical/Behavioral/Experience/Problem Solving/Leadership'
        }, {
        ...
        }
        ]
        The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;


export const FEEDBACK_PROMPT = `{{conversation}}

Based on this interview conversation between the assistant and the user, provide feedback for the user's interview. 

Give a rating out of 10 for:
- Technical Skills
- Communication
- Problem Solving
- Experience

Also provide:
- A summary in 3 lines about the interview
- A one-line recommendation message indicating whether the candidate is recommended for hire

Return the response strictly in the following JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0,
      "totalRating": 0
    },
    "summary": "<3-line summary here>",
    "recommendation": "<Yes or No>",
    "recommendationMsg": "<One-line recommendation message>"
  }
}
`;