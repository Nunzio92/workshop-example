import { initialState, reducer } from './app.reducer';
import { startLoading, stopLoading } from './app.action';


describe('undefined action', () => {
    it('should return the default store', () => {
        const action = {type: 'NOOP'} as any;
        const result = reducer(undefined, action);

        expect(result).toBe(initialState);
    });
});

describe('Start loading for spinner', () => {
    it('should return true', () => {
        const result = reducer(initialState, startLoading);
        expect(result).toEqual({
            ...initialState,
            loading: true
        });
    });
});

describe('Stop loading for spinner', () => {
    it('should return false', () => {
        const result = reducer(initialState, stopLoading);
        expect(result).toEqual({
            ...initialState,
            loading: false
        });
    });
});

