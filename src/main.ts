import { fromEvent, tap, timer } from "rxjs";
import { renderCount } from "./renderer";
import "./style.css";

const captureBtn = document.getElementById("capture-btn") as HTMLButtonElement;

const captureClick$ = fromEvent(captureBtn, "click");
const counter$ = timer(0, 1000).pipe(tap(renderCount));
