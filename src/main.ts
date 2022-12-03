import {
    fromEvent,
    map,
    Observable,
    of,
    startWith,
    switchMap,
    takeWhile,
    tap,
    timer,
    withLatestFrom,
} from "rxjs";
import "./style.css";

const count = document.getElementById("count") as HTMLElement;
const seconds = document.getElementById("seconds") as HTMLInputElement;
const toggle = document.getElementById("start-stop") as HTMLButtonElement;

const toggleClick = fromEvent(toggle, "click");
const secondsValueChanges = fromEvent(seconds, "input").pipe(
    map(({ target }) => (target as HTMLInputElement).value),
    startWith(seconds.value)
);

const generateCountDown = (lengthInSeconds: number): Observable<number> => {
    const step = 1000;

    return of(lengthInSeconds).pipe(
        switchMap((seconds) =>
            timer(0, step).pipe(
                map((tick) => seconds - tick),
                takeWhile((count) => count >= 0)
            )
        )
    );
};

toggleClick
    .pipe(
        withLatestFrom(secondsValueChanges, (_, seconds) => Number(seconds)),
        switchMap((seconds) => generateCountDown(seconds)),
        tap((currentCount) => (count.textContent = `${currentCount}`))
    )
    .subscribe();
