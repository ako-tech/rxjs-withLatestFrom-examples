import { fromEvent, map, startWith, switchMap } from "rxjs";
import { getResults, SearchCategory } from "./data";
import { renderResults } from "./renderer";
import "./renderer";
import "./style.css";

const searchInput = document.getElementById("search") as HTMLInputElement;
const categorySelect = document.getElementById("category") as HTMLSelectElement;

const searchValueChanges$ = fromEvent(searchInput, "input").pipe(
    map(({ target }) => (target as HTMLInputElement).value)
);
const categoryChanges$ = fromEvent<InputEvent>(categorySelect, "change").pipe(
    map(({ target }) => (target as HTMLSelectElement).value as SearchCategory),
    startWith(categorySelect.value as SearchCategory)
);

searchValueChanges$
    .pipe(switchMap((searchText) => getResults(searchText)))
    .subscribe(renderResults);
