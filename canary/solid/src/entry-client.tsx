import "./app/styles/index.css";
import { hydrate } from "solid-js/web";

import { App } from "./App";

const search = Object.fromEntries(new URLSearchParams(window.location.search));
hydrate(() => <App search={search} />, document.getElementById("root")!);
