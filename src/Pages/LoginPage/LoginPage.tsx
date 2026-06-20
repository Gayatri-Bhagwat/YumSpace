import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getApiToken } from "../../services/APIService";
import type { Credentials, NotFound } from "../../Enums/Auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Credentials | NotFound | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const isBlankFieldError = (error: Credentials | NotFound) => {
    if ("email" in error || "password" in error) {
      return true;
    } else {
      return false;
    }
  };
  const Login = async () => {
    setError(null);
    setLoading(true);
    const response = await getApiToken({ email: email, password: password });
    if (response.success) {
      setLoading(false);
      navigate("/home", {state:{'headline':response.data.headline, 'user_name':response.data.user_name}});
    } else if (!isBlankFieldError(response.errorDetails)) {
      setError({ details: response.errorDetails.error });
      setLoading(false);
    } else {
      setError({
        email: response.errorDetails.email,
        password: response.errorDetails.password,
      });
      setLoading(false);
    }
  };
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
        {error && "email" in error ? <span>{error.email}</span> : ""}

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
        {error && "password" in error ? <span>{error.password}</span> : ""}

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
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#d4662d")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#e8773d")
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && "details" in error ? <span>{error.details}</span> : ""}
      </div>
    </div>
  );
}
