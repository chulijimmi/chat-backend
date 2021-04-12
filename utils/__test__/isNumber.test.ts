import { isNumber } from '../isNumber';

describe('isNumber Utils', () => {
    it('Its a number', () => {
        expect(isNumber(2)).toEqual(true);
    });

    it('Its not a number', () => {
        expect(isNumber(false)).toEqual(false);
    });
});
