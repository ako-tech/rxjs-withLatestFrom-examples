import { fromEvent, switchMap } from "rxjs";
import { SearchResult, SearchResults } from "./data";

const resultsContainer = document.getElementById("results-container");
const searchInput = document.getElementById("search") as HTMLInputElement;

const searchFocus$ = fromEvent(searchInput, "focus");
const searchInput$ = fromEvent(searchInput, "input");
const searchBlur$ = fromEvent(searchInput, "blur");

searchFocus$.pipe(switchMap((_) => searchInput$)).subscribe(showResults);
searchBlur$.subscribe(hideResults);

function showResults(): void {
    resultsContainer?.classList.remove("hidden");
}
function hideResults(): void {
    resultsContainer?.classList.add("hidden");
    resultsContainer!.ontransitionend = () => {
        resultsContainer!.textContent = "";
        resultsContainer!.ontransitionend = null;
    };
}

export function renderResults(results: SearchResults): void {
    resultsContainer?.replaceChildren(...results.map(renderRow));
}

function renderRow(result: SearchResult): HTMLLIElement {
    const el = document.createElement("li");
    el.classList.add(result.category);
    el.textContent = result.title;
    return el;
}
