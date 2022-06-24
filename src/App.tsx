import Grid from "./components/grid";
import Header from "./components/header";
import StateSelector from "./components/stateSelector";
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
  } = usePathfinding(19, 43);

  return (
    <div className="App">
      <Header
        handleClearPath={handleClearPath}
        handlePathfindingVisualization={handlePathfindingVisualization}
        handleClearNodesByType={handleClearNodesByType}
        handleGenerateMaze={handleGenerateMaze}
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
