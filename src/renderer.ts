const count = document.getElementById("count") as HTMLElement;

export function renderCount(current: number) {
    count.textContent = `${current}`;
}
