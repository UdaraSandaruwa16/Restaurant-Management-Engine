import React, { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [isLoding, setIsLoding] = useState(false);

  async function aiReportGenerate() {
    setIsLoding(true);
    try {
      const response = await axios.get("http://localhost:3000/api/aiReport");
      if (response.status === 200) {
        toast.success("AI Report already sended to your email", {
          position: "top-right",
        });
        console.log("Email sended");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <div className="h-screen w-full gradient-bg flex flex-col items-center pt-[120px]">
      <svg
        width="100%"
        height="300"
        viewBox="0 0 1000 200"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounceUp"
      >
        <defs>
          <linearGradient
            id="gradientPhoenix"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#086FFF">
              <animate
                attributeName="stop-color"
                values="#086FFF;#FFDDB7;#086FFF"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#FFDDB7">
              <animate
                attributeName="stop-color"
                values="#FFDDB7;#086FFF;#FFDDB7"
                dur="3.15s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#086FFF">
              <animate
                attributeName="stop-color"
                values="#086FFF;#FFDDB7;#086FFF"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <text
          fill="#FFF"
          fontSize="80"
          fontFamily="Arial, sans-serif"
          textAnchor="middle"
          x="50%"
          y="75" // Adjust the y position for vertical alignment
        >
          Welcome to
        </text>
        <text
          fill="#FFF"
          fontSize="100"
          fontFamily="Arial, sans-serif"
          textAnchor="middle"
          x="50%"
          y="160" // Adjusted for the size and position of the second line
        >
          The
          <tspan fill="url(#gradientPhoenix)"> Phoenix </tspan>
          Era
        </text>
      </svg>
      <a href="https://phoenix-ai.netlify.app/">
        <Button className="w-60 h-[50px] text-lg rounded-full bg-transparent text-white items-center animate-bounceUp">
          Chat with Phoenix <ArrowRightOutlined />{" "}
        </Button>
      </a>
      <div className="mx-auto mt-7">
        <p className="text-white text-4xl">
          The Phoenix ecosystem represents Rigit's {" "}
          <strong className="title-gradient__gradient ">most capable AI</strong>{" "}
          .
        </p>
      </div>
      <div className="mx-auto mt-7">
        <p className="text-white text-3xl">
          Generate{" "}
          <strong className="title-gradient__gradient">comprehensive</strong>{" "}
          full sales report with Phoenix AI.
          {/* <strong className="title-gradient__gradient "> Phoenix AI</strong>. */}
        </p>
      </div>
      <div className="mx-auto mt-7">
        <p className="text-white text-lg">
          The report should be thorough and cover all relevant aspects of sales.
          <br />
          It implies that the report should not overlook any significant
          details.
        </p>
      </div>
      <Button
        onClick={aiReportGenerate}
        className="w-[30vh] h-[45px] text-lg rounded-full bg-transparent text-white items-center justify-center text-center animate-bounceUp mt-3"
      >
        {isLoding ? "Generating..." : "Generate Report"} {" "}
      </Button>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
