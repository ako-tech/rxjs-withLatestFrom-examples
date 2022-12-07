import { fromEvent, tap, timer, withLatestFrom } from "rxjs";
import { renderCount } from "./renderer";
import "./style.css";

const captureBtn = document.getElementById("capture-btn") as HTMLButtonElement;

const captureClick$ = fromEvent(captureBtn, "click");
const counter$ = timer(5000, 1000).pipe(tap(renderCount));

captureClick$
    .pipe(withLatestFrom(counter$, (click, count) => count))
    .subscribe(console.log);
