import Grid from "./components/grid";
import Header from "./components/header";
import StateSelector from "./components/stateSelector";
import usePathfinding from "./hooks/usePathfinding";
import "./styles/App.css";

function App() {
  const {
    handleNodeChange,
    nodes,
    handleSelectedStateChange,
    selectedState,
    handlePathfindingVisualization,
  } = usePathfinding(20, 50);

  return (
    <div className="App">
      <Header handlePathfindingVisualization={handlePathfindingVisualization} />
      <StateSelector
        selectedState={selectedState}
        handleSelectedStateChange={handleSelectedStateChange}
      />
      <Grid handleNodeChange={handleNodeChange} nodes={nodes} />
    </div>
  );
}

export default App;
