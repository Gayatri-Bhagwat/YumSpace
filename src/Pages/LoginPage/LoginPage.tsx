import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  function Login(){
    navigate("/home")
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF7F2",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            color: "#e8773d",
            fontWeight: 600,
          }}
        >
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />

        {/* Button */}
        <button
          onClick={() => Login()}
          style={{
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#e8773d",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#d4662d")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#e8773d")}
        >
          Login
        </button>
      </div>
    </div>
  );
}