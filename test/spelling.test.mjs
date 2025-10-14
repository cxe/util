import { icaoEncode, icaoDecode } from '../spelling.mjs';

describe('ICAO Phonetic Encoder/Decoder', () => {

  test('encodes simple uppercase text', () => {
    expect(icaoEncode('HELLO')).toBe('HOTEL ECHO LIMA LIMA OSCAR');
  });

  test('encodes lowercase with case preservation', () => {
    expect(icaoEncode('hello')).toBe('Hotel Echo Lima Lima Oscar');
  });

  test('encodes digits and punctuation', () => {
    expect(icaoEncode('Test 123!')).toBe(
      'TANGO Echo Sierra Tango Space One Two Three Exclamation Mark'
    );
  });

  test('decodes simple phrase', () => {
    expect(
      icaoDecode('HOTEL ECHO LIMA LIMA OSCAR')
    ).toBe('HELLO');
  });

  test('round-trip encoding/decoding', () => {
    const text = 'Hello, World! 123';
    const encoded = icaoEncode(text);
    const decoded = icaoDecode(encoded);
    expect(decoded).toBe(text.toUpperCase());
  });

  test('supports speech mode', () => {
    const encoded = icaoEncode('Hi', { speech: true });
    expect(encoded).toMatch(/<break time='200ms'\/>/);
  });

  test('supports custom separator', () => {
    const encoded = icaoEncode('OK', { separator: ' / ' });
    expect(encoded).toBe('OSCAR / KILO');
  });

  test('ignores unknown characters', () => {
    expect(icaoEncode('©')).toBe('©');
  });
});
