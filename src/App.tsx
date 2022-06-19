import Grid from "./components/grid";
import StateSelector from "./components/stateSelector";
import usePathfinding from "./hooks/usePathfinding";
import "./styles/App.css";

function App() {
  const { handleNodeChange, nodes, handleSelectedStateChange, selectedState } =
    usePathfinding(2, 5);

  return (
    <div className="App">
      <StateSelector
        selectedState={selectedState}
        handleSelectedStateChange={handleSelectedStateChange}
      />
      <Grid handleNodeChange={handleNodeChange} nodes={nodes} />
    </div>
  );
}

export default App;
