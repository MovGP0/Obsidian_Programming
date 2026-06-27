---
title: Yule-Walker Method
---
**Yule-Walker method** estimates autoregressive coefficients from autocorrelation values.

For an AR($p$) model, the normal equations are

$$
\begin{bmatrix}
r[0] & r[1] & \cdots & r[p-1] \\
r[1] & r[0] & \cdots & r[p-2] \\
\vdots & \vdots & \ddots & \vdots \\
r[p-1] & r[p-2] & \cdots & r[0]
\end{bmatrix}
\begin{bmatrix}a_1\\a_2\\\vdots\\a_p\end{bmatrix}
=
-\begin{bmatrix}r[1]\\r[2]\\\vdots\\r[p]\end{bmatrix}.
$$

The Toeplitz structure is usually solved with Levinson-Durbin recursion.

```csharp
static double[] LevinsonDurbin(ReadOnlySpan<double> autocorrelation, int order)
{
    var a = new double[order + 1];
    a[0] = 1.0;
    var error = autocorrelation[0];

    for (var i = 1; i <= order; i++)
    {
        var acc = autocorrelation[i];
        for (var j = 1; j < i; j++)
        {
            acc += a[j] * autocorrelation[i - j];
        }

        var reflection = -acc / error;
        for (var j = 1; j <= i / 2; j++)
        {
            var left = a[j];
            var right = a[i - j];
            a[j] = left + reflection * right;
            a[i - j] = right + reflection * left;
        }

        a[i] = reflection;
        error *= 1.0 - reflection * reflection;
    }

    return a;
}
```

## Related

- [[AR spectral estimation]]
- [[Burg method]]
- [[Autocorrelation]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Yule-Walker equations](https://en.wikipedia.org/wiki/Autoregressive_model#Yule%E2%80%93Walker_equations)
- [Wikipedia: Levinson recursion](https://en.wikipedia.org/wiki/Levinson_recursion)

