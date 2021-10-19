import React, { useEffect } from "react";
import { Dashboard } from "components";
import { useAppDispatch } from "app/hooks";
import { loadListsAsync } from "features/lists";

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadListsAsync());
  }, []);

  return (
    <Dashboard />
  )
}

export default App;
