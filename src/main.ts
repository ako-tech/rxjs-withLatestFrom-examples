import { fromEvent, map, tap, timer, withLatestFrom } from "rxjs";
import { renderCount } from "./renderer";
import "./style.css";

const logBtn = document.getElementById("log-button") as HTMLButtonElement;

const logClick$ = fromEvent(logBtn, "click");
const counter$ = timer(0, 1000).pipe(tap(renderCount));

logClick$
    .pipe(
        withLatestFrom(counter$, (event, count) => count)
        // map(([event, count]) => count)
    )
    .subscribe(console.log);
