import { Button } from "@/components/ui/button";
import type React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <Button onClick={() => navigate("/login")}>Login as a Student</Button>
      <Button onClick={() => navigate("/register")}>Join as an Instructor</Button>
    </div>
  );
};

export default LandingPage;
