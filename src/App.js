import React, { useContext, useState } from 'react';
import './App.css';

const AppContext = React.createContext({ groups: [] });
const NestedContext = React.createContext({ groups: [] });

const AppProvider = props => {
  const [groups] = useState([1, 2, 3, 4, 5])
  return (
    <AppContext.Provider value={{ groups }}>
      {props.children}
    </AppContext.Provider>
  )
};

const NestedProvider = props => {
  const { groups } = useContext(AppContext);
  const compassGroups = Object.assign(groups.filter(g => g <= 4))
  return (
    <NestedContext.Provider value={{ groups: compassGroups }}>
      {props.children}
    </NestedContext.Provider>
  )
};

function App() {
  return (
    <AppProvider>
      <NestedProvider>
        <GroupList />
      </NestedProvider>
    </AppProvider>
  );
}

const GroupList = () => {
  const { groups } = useContext(NestedContext);
  return (
    <div>Groups {groups.map(g => `group: ${g}, `)}</div>
  )
};

export default App;
