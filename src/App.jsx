import Home from "./components/Home";
import styled from "styled-components";

const AppCover = styled.div`
  background-color: #f3eaea;
  background-size: cover;
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const AppContent = styled.div`
  background-color: white;
  width: 60%;
  padding: 20px;
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
