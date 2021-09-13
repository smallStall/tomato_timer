/**
 * @jest-environment jsdom
 */

import React from 'react'
import { useCountdown } from '../src/hooks/useCountdown'
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Start', () => {
  it('time should be zero', ()=> {
    const Component = () => {
      const [ timer, time, status ] = useCountdown(2, 1000);
      return(
        <div>
          <button onClick={timer.start}>Start</button>
          <p data-testid="time">{time.toPrecision(2)}</p>
          <p data-testid="status">{status}</p>
        </div>
      )
    };
    const { getByRole, getByTestId } = render(<Component />);
    expect(getByTestId('status').textContent).toBe('STOPPED');
    fireEvent.click(getByRole('button'));
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(getByTestId('status').textContent).toBe('RUNNING');
    expect(getByTestId('time').textContent).toBe('2.0');

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getByTestId('time').textContent).toBe('0.0');

  })
})


describe('Stop', () => {
  it('should stop timer when pushes button', ()=> {
    const Component = () => {
      const [ timer, time, status ] = useCountdown(2, 1000);
      return(
        <div>
          <button  data-testid="start" onClick={timer.start}>Start</button>
          <button  data-testid="stop" onClick={timer.stop}>Start</button>
          <p data-testid="time">{time.toPrecision(2)}</p>
          <p data-testid="status">{status}</p>
        </div>
      )
    };
    const { getByTestId } = render(<Component />);
    expect(getByTestId('status').textContent).toBe('STOPPED');
    fireEvent.click(getByTestId('start'));
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(getByTestId('status').textContent).toBe('RUNNING');
    expect(getByTestId('time').textContent).toBe('2.0');
    fireEvent.click(getByTestId('stop'));
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(getByTestId('time').textContent).toBe('0.0');

  })
})

describe('PauseAndResume', () => {
  it('should pause and resume timer when pushes button', ()=> {
    const Component = () => {
      const [ timer, time, status ] = useCountdown(2, 1000);
      return(
        <div>
          <button data-testid="start" onClick={timer.start}>A</button>
          <button data-testid="pause" onClick={timer.pause}>B</button>
          <button data-testid="resume" onClick={timer.resume}>C</button>
          <p data-testid="time">{time.toPrecision(2)}</p>
          <p data-testid="status">{status}</p>
        </div>
      )
    };
    const { getByTestId } = render(<Component />);
    expect(getByTestId('status').textContent).toBe('STOPPED');
    fireEvent.click(getByTestId('start'));
    expect(getByTestId('status').textContent).toBe('RUNNING');
    fireEvent.click(getByTestId('pause'));
    expect(getByTestId('status').textContent).toBe('PAUSED');
    fireEvent.click(getByTestId('resume'));
    expect(getByTestId('status').textContent).toBe('RESUME');
    act(() => {
      jest.advanceTimersByTime(1010);
    });
    expect(getByTestId('time').textContent).toBe('1.0');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('time').textContent).toBe('0.0');
  })
})
