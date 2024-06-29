import React from "react";
import Home from "./components/Home";
import styled from "styled-components";

const AppCover = styled.div`
  background-color: #f3eaea;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const AppContent = styled.div`
  background-color: white;
  height: 100%;
  width: 60%;
`;

function App() {
  return (
    <AppCover>
      <AppContent>
        <Home />
      </AppContent>
    </AppCover>
  );
}

export default App;
