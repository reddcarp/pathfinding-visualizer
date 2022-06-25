import Grid from "./components/grid";
import Header from "./components/header";
import Modal from "./components/modal";
import StateSelector from "./components/stateSelector";
import Toast from "./components/toast";
import usePathfinding from "./hooks/usePathfinding";
import "./styles/App.css";

function App() {
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    nodes,
    handleSelectedNodeType,
    selectedNodeType,
    handleClearPath,
    handlePathfindingVisualization,
    handleClearNodesByType,
    handleGenerateMaze,
    isAnimationProcessing,
    showTutorial,
    handleSetShowTutorial,
  } = usePathfinding(23, 55);

  return (
    <div className="App">
      {isAnimationProcessing && <Toast message="Processing animation" />}
      {showTutorial.showTutorial != "false" && (
        <Modal handleSetShowTutorial={handleSetShowTutorial} />
      )}
      <Header
        handleClearPath={handleClearPath}
        handlePathfindingVisualization={handlePathfindingVisualization}
        handleClearNodesByType={handleClearNodesByType}
        handleGenerateMaze={handleGenerateMaze}
        handleSetShowTutorial={handleSetShowTutorial}
      />
      <StateSelector
        selectedNodeType={selectedNodeType}
        handleSelectedNodeType={handleSelectedNodeType}
      />
      <Grid
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        nodes={nodes}
      />
    </div>
  );
}

export default App;
