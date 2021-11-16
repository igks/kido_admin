import store from "./redux/store";
import { Provider } from "react-redux";
import EntryRoute from "./navigations/EntryRoute";
import CustomAlert from "./components/shared/commons/CustomAlert";

const App = () => {
  return (
    <Provider store={store}>
      <EntryRoute />
      <CustomAlert />
    </Provider>
  );
};

export default App;
