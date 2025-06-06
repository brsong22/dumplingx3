export type FunctionType = (...args: any[]) => void;

export function debounce<F extends FunctionType>(func: F, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<F>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}