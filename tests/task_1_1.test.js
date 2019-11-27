const helpers = require('../src/helpers.js');
const reversedStr = helpers.reversedStr;

test('test string reversion', () => {
    const result = reversedStr('test data');
    expect(result).toBe('atad tset');
});

test('test number reversion', () => {
    const result = reversedStr('123 4567');
    expect(result).toBe('7654 321');
});

test('test special characters reversion', () => {
    const result = reversedStr('$# ^%%');
    expect(result).toBe('%%^ #$');
});

