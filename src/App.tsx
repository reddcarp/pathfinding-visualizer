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
  } = usePathfinding(20, 44);

  return (
    <div className="App">
      <Header
        handleClearPath={handleClearPath}
        handlePathfindingVisualization={handlePathfindingVisualization}
        handleClearNodesByType={handleClearNodesByType}
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
