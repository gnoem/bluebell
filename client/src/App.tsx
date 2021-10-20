import React, { useEffect } from "react";
import { Dashboard, Modal } from "components";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { loadListsAsync } from "features/lists";
import { selectModal } from "features/modal";

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  useEffect(() => {
    dispatch(loadListsAsync());
  }, []);

  return (
    <>
      {modal && <Modal {...modal} />}
      <Dashboard />
    </>
  )
}

export default App;
