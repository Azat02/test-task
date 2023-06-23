import Panel from './components/admin/Panel';
import Team from './components/team/Team';
import './index.css'

function App() {
  return (
    <>
        <div className='wrapper'>
            <Panel/>
            <Team/>
        </div>
    </>
  );
}

export default App;
