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
    handleSelectedStateChange,
    selectedState,
    handlePathfindingVisualization,
  } = usePathfinding(20, 40);

  return (
    <div className="App">
      <Header handlePathfindingVisualization={handlePathfindingVisualization} />
      <StateSelector
        selectedState={selectedState}
        handleSelectedStateChange={handleSelectedStateChange}
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
