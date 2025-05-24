import type { Session } from "next-auth";

type SessionMock =
    | { data: Session; status: "authenticated"; update: () => Promise<Session | null> }
    | { data: null; status: "loading" | "unauthenticated"; update: () => Promise<Session | null> };

const mockUpdateSession = jest.fn(() => Promise.resolve(null));

export const loadingSession: SessionMock = {
    data: null,
    status: "loading",
    update: mockUpdateSession,
};

export const signedOutSession: SessionMock = {
    data: null,
    status: "unauthenticated",
    update: mockUpdateSession,
};

export const signedInSession: SessionMock = {
    data: {
        user: {
            name: "Test User",
            email: "test@example.com",
        },
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
    status: "authenticated",
    update: mockUpdateSession,
};
