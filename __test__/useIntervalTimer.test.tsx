/**
 * @jest-environment jsdom
 */

import { useIntervalTimer } from "../src/hooks/useIntervalTimer";
import {
  RenderResult,
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import {
  UseIntervalTimerProps,
  UseIntervalTimerReturn,
} from "../src/hooks/types";

const advanceSeconds = (seconds: number) => {
  act(() => {
    jest.advanceTimersByTime(seconds);
  });
};

jest.useFakeTimers();

describe("**useIntervalTimer**", () => {
  let result: RenderResult<UseIntervalTimerReturn>;
  beforeEach(() => {
    let hookResult: RenderHookResult<
      UseIntervalTimerProps,
      UseIntervalTimerReturn
    >;
    hookResult = renderHook(() => useIntervalTimer(3, 2, 1, 0, 2, 1, ""));
    result = hookResult.result;
  });
  it("開始前はSTOPPED", () => {
    expect(result.current.state.status).toBe("STOPPED");
  });

  advanceSeconds(0.1);
  it("0s after start", () => {
    act(() => {
      result.current.timer.start();
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed()).toBe("3");
    expect(result.current.state.leftTime.toFixed(1)).toBe("14.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("Work");
  });



  it("0.55s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(550);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("3.0");
    expect(result.current.state.leftTime.toFixed(1)).toBe("14.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("Work");
  });

  it("3.3s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(3300);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed()).toBe("0");
    expect(result.current.state.leftTime.toFixed(1)).toBe("11.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("NextRest");
  });

  it("4.1s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(4100);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed()).toBe("2");
    expect(result.current.state.leftTime.toFixed(1)).toBe("10.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("Rest");
  });


  it("7.5s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(7500);
    });
    expect(result.current.state.count).toBe(1);
    expect(result.current.displayTime.toFixed()).toBe("3");
    expect(result.current.state.leftTime.toFixed(1)).toBe("7.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("Work");
  });
  
  it("9.1s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(9100);
    });
    expect(result.current.state.count).toBe(1);
    expect(result.current.displayTime.toFixed()).toBe("1");
    expect(result.current.state.leftTime.toFixed(1)).toBe("5.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.activity).toBe("Work");
  });

  it("15.5s after start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(15500);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("0.0");
    expect(result.current.state.leftTime.toFixed(1)).toBe("0.0");
    expect(result.current.state.status).toBe("STOPPED");
    expect(result.current.state.activity).toBe("None");
  });

  it("Pause after 0.2s from start, then 2s later", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(200);
      result.current.timer.pause();
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("2.8");
    expect(result.current.state.leftTime.toFixed(1)).toBe("13.8");
    expect(result.current.state.status).toBe("PAUSED");
    expect(result.current.state.activity).toBe("Work");
  });

  it("Pause after 0.1s from start, resume after 1s, and after another 2s", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(100);
      result.current.timer.pause();
      jest.advanceTimersByTime(1000);
      result.current.timer.resume();
      jest.advanceTimersByTime(2100);
    });
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("0.9");
    expect(result.current.state.leftTime.toFixed(1)).toBe("11.9")
    expect(result.current.state.status).toBe("RESUME");
    expect(result.current.state.activity).toBe("Work");
  });

  
  it("Retry after 2.5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.retry();
    });
    expect(result.current.displayTime.toFixed(1)).toBe("3.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("14.0")
    expect(result.current.state.activity).toBe("Work");
    expect(result.current.state.count).toBe(0);
  });

  it("Retry after 2.5s from start and after another 1.0s", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.retry();
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.displayTime.toFixed(1)).toBe("2.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("13.0")
    expect(result.current.state.activity).toBe("Work");
    expect(result.current.state.count).toBe(0);
  });

  it("Retry after 12.5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(12500);
      result.current.timer.retry();
    });
    expect(result.current.displayTime.toFixed(1)).toBe("2.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("3.0")
    expect(result.current.state.activity).toBe("Rest");
    expect(result.current.state.count).toBe(1);
  });

  it("Jump after 2.5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.jump();
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("10.0")
    expect(result.current.state.activity).toBe("Rest");
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("2.0");
  });

  it("Jump after 2.5s from start, and after another 1.0s", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.jump();
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("9.0")
    expect(result.current.state.activity).toBe("Rest");
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("1.0");
  });

  it("Jump after 12.5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(12500);
      result.current.timer.jump();
    });
    expect(result.current.displayTime.toFixed(1)).toBe("0.0");
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("0.0")
    expect(result.current.state.activity).toBe("None");
    expect(result.current.state.count).toBe(2);
  });

  it("Add -2s after 2.5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.add(-2);
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("9.5")
    expect(result.current.state.activity).toBe("Rest");
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("1.5");
  });

  it("Add -2s after 2.5s from start and after another 2.0s", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(2500);
      result.current.timer.add(-2);
      jest.advanceTimersByTime(2010);
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("7.5")
    expect(result.current.state.activity).toBe("Rest");
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("0.0");
  });

  it("Add 3s after 5s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(5010);
      result.current.timer.add(3);
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("12.0")
    expect(result.current.state.activity).toBe("Work");
    expect(result.current.state.count).toBe(0);
    expect(result.current.displayTime.toFixed(1)).toBe("1.0");
  });


  it("Add 3s after 5s from start and after another 5s", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(5000);
      result.current.timer.add(3);
      jest.advanceTimersByTime(5010);
    });
    expect(result.current.state.status).toBe("RUNNING");
    expect(result.current.state.leftTime.toFixed(1)).toBe("7.0")
    expect(result.current.state.activity).toBe("Work");
    expect(result.current.state.count).toBe(1);
    expect(result.current.displayTime.toFixed(1)).toBe("3.0");
  });


  it("Stop after 9.0s from start", () => {
    act(() => {
      result.current.timer.start();
      jest.advanceTimersByTime(9000);
      result.current.timer.stop();
    });
    expect(result.current.displayTime.toFixed(1)).toBe("0.0");
    expect(result.current.state.status).toBe("STOPPED");
    expect(result.current.state.leftTime.toFixed(1)).toBe("0.0")
    expect(result.current.state.activity).toBe("None");
    expect(result.current.state.count).toBe(0);
  });
});
