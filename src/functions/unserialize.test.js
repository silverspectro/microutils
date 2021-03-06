import unserialize from './unserialize';

describe('libs/unserialize', () => {
  test('should unserialize a function', () => {
    const unserialized = {
      "args": ["test"],
      "body": "return test"
    };

    const f = unserialize(unserialized);
    expect(f).toBeInstanceOf(Function);
    expect(f('test')).toEqual('test');
  });

  test('should throw an error if new Function fails unserialize a function', () => {
    const originalConsoleError = console.error;
    const mockFn = jest.fn();
    console.error = mockFn;
    const unserialized = {
      "args": ["test"],
      "body": "return test; var = 'toto"
    };
    unserialize(unserialized);

    expect(mockFn.mock.calls[0]).toHaveLength(1);
    console.error = originalConsoleError;
  });
});