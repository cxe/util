import { natoEncode, natoDecode } from '../spelling.mjs';

describe('NATO Phonetic Encoder/Decoder', () => {

  test('encodes simple uppercase text', () => {
    expect(natoEncode('HELLO')).toBe('HOTEL ECHO LIMA LIMA OSCAR');
  });

  test('encodes lowercase with case preservation', () => {
    expect(natoEncode('hello')).toBe('Hotel Echo Lima Lima Oscar');
  });

  test('encodes digits and punctuation', () => {
    expect(natoEncode('Test 123!')).toBe(
      'TANGO Echo Sierra Tango Space One Two Three Exclamation Mark'
    );
  });

  test('decodes simple phrase', () => {
    expect(
      natoDecode('HOTEL ECHO LIMA LIMA OSCAR')
    ).toBe('HELLO');
  });

  test('round-trip encoding/decoding', () => {
    const text = 'Hello, World! 123';
    const encoded = natoEncode(text);
    const decoded = natoDecode(encoded);
    expect(decoded).toBe(text.toUpperCase());
  });

  test('supports speech mode', () => {
    const encoded = natoEncode('Hi', { speech: true });
    expect(encoded).toMatch(/<break time='200ms'\/>/);
  });

  test('supports custom separator', () => {
    const encoded = natoEncode('OK', { separator: ' / ' });
    expect(encoded).toBe('OSCAR / KILO');
  });

  test('ignores unknown characters', () => {
    expect(natoEncode('©')).toBe('©');
  });
});
