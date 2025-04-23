describe("range", () => {
  it("should return the correct range", () => {
    expect(range(3)).toEqual([0, 1, 2]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 7)).toEqual([3, 4, 5, 6, 7]);
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    expect(range(0, 0)).toEqual([0]);
    expect(range(5, 3)).toEqual([]);
  });
}
