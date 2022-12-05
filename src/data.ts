import { filter, from, map, Observable, toArray } from "rxjs";

export type SearchCategory = "all" | "books" | "films";
export interface SearchResult {
    title: string;
    category: SearchCategory;
}

export type SearchResults = SearchResult[];

const films: SearchResults = [
    { title: "The GodFather", category: "films" },
    { title: "The GodFather Part II", category: "films" },
    { title: "The Dark Knight", category: "films" },
    { title: "The Shawshank Redemption", category: "films" },
    { title: "Schindler's List", category: "films" },
    { title: "12 Angry Men", category: "films" },
    { title: "Pulp Fiction", category: "films" },
    {
        title: "The Lord of the Rings: The Return of the King",
        category: "films",
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        category: "films",
    },
    { title: "The Good, the Bad and the Ugly", category: "films" },
    { title: "Forrest Gump", category: "films" },
    { title: "Fight Club", category: "films" },
];
const books: SearchResults = [
    { title: "In Search of Lost Time", category: "books" },
    { title: "Ulysses", category: "books" },
    { title: "Don Quixote", category: "books" },
    { title: "One Hundred Years of Solitude", category: "books" },
    { title: "The Great Gatsby", category: "books" },
    { title: "Moby Dick", category: "books" },
    { title: "War and Peace", category: "books" },
    { title: "Hamlet", category: "books" },
    { title: "The Catcher in the Rye", category: "books" },
    { title: "The Adventures of Huckleberry Finn", category: "books" },
    { title: "Alice's Adventures in Wonderland", category: "books" },
    { title: "One Thousand and One Nights", category: "books" },
];

const db = [...films, ...books];

export function getResults(
    search: string,
    category: SearchCategory = "all"
): Observable<SearchResults> {
    return from(db).pipe(
        filter((result) => category === "all" || result.category === category),
        filter((result) =>
            result.title.toLowerCase().includes(search.toLowerCase())
        ),
        toArray(),
        map((results) => [...results].sort(sortByTitleAsc))
    );
}

const sortByTitleAsc = (a: SearchResult, b: SearchResult) =>
    a.title.localeCompare(b.title);
