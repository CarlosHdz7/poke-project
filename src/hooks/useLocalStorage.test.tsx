import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('shouldTesting useLocalStorageHook', () => {
  it('should get default value localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('bookmarks', []));
    const [state] = result.current;
    expect(state).toEqual([]);
  });

  test('should get value localStorage', () => {
    localStorage.setItem('test', 'Hello world');
    const { result } = renderHook(() => useLocalStorage('test', 'Hello world'));
    const [state] = result.current;
    expect(state).toEqual('Hello world');
  });

  it('should set value localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'Hello world'));
    const [, setState] = result.current;
    act(() => {
      setState('Hello test');
    });
    const [state2] = result.current;
    expect(state2).toEqual('Hello test');
  });

  it('should set function value localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'Hello world'));
    const [, setState] = result.current;
    act(() => {
      setState(() => 'Hello test');
    });
    const [state2] = result.current;
    expect(state2).toEqual('Hello test');
  });
});
