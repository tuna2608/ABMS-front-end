import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../utilities/responsive";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/apiCalls";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const AnimationContainer = styled.div`
  flex: 3;
  ${mobile({
    display: "none",
  })}
`;

const RegisterContainer = styled.div`
  flex: 7;
  display: flex;
  align-items: center;
  ${mobile({
    width: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    padding: "30px",
  })}
`;

const RegisterForm = styled.form`
  margin-left: 100px;
  padding: 0 60px 30px 60px;
  width: 100%;
  max-width: 416px;
  display: flex;
  flex-flow: column;
  gap: 1px;
  ${mobile({
    margin: "0",
    padding: "30px",
    // alignItems: "center",
    justifyContent: "center",
    height: "100%",
  })}
`;

const Title = styled.h2`
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: 0.2px solid #ccc;
  font-weight: 600;
  font-size: 16px;
  background-color: ${(props) =>
    props.tone === "dark" ? "#000" : "transparent"};
  color: ${(props) => (props.tone === "dark" ? "#fff" : "#000")};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Input = styled.input`
  padding: 15px 20px;
  border-radius: 10px;
  border: 0.2px solid #ccc;
  margin-bottom: 20px;
`;

const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: #8b8282;
  margin: 10px 0;
`;

const Label = styled.p`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;
const GoogleImage = styled.img`
  width: 30px;
  height: 30px;
`;

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isFetching } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Validation
  const isValidEmail = (value) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    // Password validation: at least 6 characters
    return value.length >= 6;
  };
  // End Validation

  const handleRegister = (e) => {
    e.preventDefault();
    // Validation checks
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.", {});
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 6 characters long.", {});
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password are not matched.", {});
      return;
    }

    signup(dispatch, { username, email, password, confirmPassword });
    navigate("/login", { state: "registered" });
  };

  return (
    <Container>
      <AnimationContainer>
        <video
          src="./videos/animation.mp4"
          playsInline
          autoPlay
          loop
          muted
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            overflowClipMargin: "content-box",
          }}
        ></video>
      </AnimationContainer>
      <RegisterContainer>
        <RegisterForm>
          <Title>Sign up to A'More</Title>
          <Button>
            <GoogleImage src="./images/google.jpg" />
            Sign up with Google
          </Button>
          <Text>or</Text>
          <Label>Username</Label>
          <Input
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Label> Email</Label>
          <Input
            required
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            required
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Confirm Password</Label>
          <Input
            required
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button tone="dark" onClick={handleRegister} disabled={isFetching}>
            Sign up
          </Button>
          <Text>
            Already have an account?
            <NavLink to={"/login"} style={{ color: "#000" }}>
              Sign in
            </NavLink>
          </Text>
        </RegisterForm>
      </RegisterContainer>
    </Container>
  );
};

export default Register;
