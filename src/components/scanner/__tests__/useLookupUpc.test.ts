// __tests__/useLookupUpc.test.ts
import { renderHook, act, waitFor } from "@testing-library/react";
import { useLookupUpc } from "../useLookupUpc";
import { mockItem } from "@/test-utils/mockItem";

global.fetch = jest.fn();

describe("useLookupUpc", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    it("should initialize with null result and not loading", () => {
        const { result } = renderHook(() => useLookupUpc());
        expect(result.current.itemInfo).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it("should fetch and set result on successful search", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ item: mockItem }),
        });

        const { result } = renderHook(() => useLookupUpc());

        act(() => {
            result.current.searchUpc("12345");
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.itemInfo).toEqual(mockItem);
    });

    it("should set result to null on failed fetch", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const { result } = renderHook(() => useLookupUpc());

        act(() => {
            result.current.searchUpc("invalid");
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.itemInfo).toBeNull();
    });
});
