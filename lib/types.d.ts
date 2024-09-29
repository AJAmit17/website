/* eslint-disable @typescript-eslint/no-explicit-any */
interface GitHubEvent {
    type: string;
    payload: {
        size?: number;
        action?: string;
        pull_request?: {
            merged?: boolean;
        };
        ref_type?: string;
    };
}

interface CacheFunction {
    <T>(
        fn: (...args: any[]) => Promise<T>,
        options?: number | { revalidate: number }
    ): (...args: any[]) => Promise<T>;
}

declare const cache: CacheFunction;
declare const HOURS_12: number;