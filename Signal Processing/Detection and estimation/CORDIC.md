---
title: CORDIC
---
**Coordinate Rotation Digital Computer** (**CORDIC**) computes trigonometric, vector magnitude, and angle operations using shifts, adds, and a lookup table.

In rotation mode, each iteration applies

$$
\begin{aligned}
x_{i+1} &= x_i - d_i y_i 2^{-i} \\
y_{i+1} &= y_i + d_i x_i 2^{-i} \\
z_{i+1} &= z_i - d_i \arctan(2^{-i})
\end{aligned}
$$

where $d_i$ selects the rotation direction. The shift-add structure maps well to fixed-point hardware.

```verilog
always @(posedge clk) begin
  if (z[WIDTH-1]) begin
    x <= x + (y >>> stage);
    y <= y - (x >>> stage);
    z <= z + atan_lut[stage];
  end else begin
    x <= x - (y >>> stage);
    y <= y + (x >>> stage);
    z <= z - atan_lut[stage];
  end
end
```

## Related

- [[Phase correlation]]
- [[Energy detector]]
- [[Recursive least squares]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: CORDIC](https://en.wikipedia.org/wiki/CORDIC)
- [ZipCPU: Building a CORDIC](https://zipcpu.com/dsp/2017/08/30/cordic.html)

