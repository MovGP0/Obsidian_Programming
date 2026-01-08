## Basic Process
| Step                  | Concept (Math)                                                         | Tensor Notation                                                                             | Tensor Notation using Python  | Notation using `torch.nn`    |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------- |
| **1. Prediction**     | Make a prediction:  $\hat{y} = f(X, \theta)$                           | $\hat{y} = X W + b$                                                                         | `y_hat = X @ W + b`           | `y_hat = model(X)`           |
| **2. Loss Calc**      | Quantify the error:  $L = \mathrm{Loss}(\hat{y}, y)$                   | $L = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2$                                        | `loss = mean((y_hat - y)**2)` | `loss = criterion(y_hat, y)` |
| **3. Gradient Calc**  | Find the slope of the loss:  $\nabla_\theta L$                         | $\nabla_W L,\; \nabla_b L = \frac{\partial L}{\partial W},\; \frac{\partial L}{\partial b}$ | `loss.backward()`             | `loss.backward()`            |
| **4. Param Update**   | Step down the slope:  $\theta_{t+1} = \theta_t - \eta \nabla_\theta L$ | $W \leftarrow W - \eta \nabla_W L,\quad b \leftarrow b - \eta \nabla_b L$                   | `W -= lr * W.grad`            | `optimizer.step()`           |
| **5. Gradient Reset** | Reset for the next loop.                                               | $\nabla_W L \leftarrow 0,\quad \nabla_b L \leftarrow 0$<br>                                 | `W.grad.zero_()`              | `optimizer.zero_grad()`      |
### Tensors

All operations work on `torch.Tensor`.

Create Tensor from data
```python
data = [[1,2,3], [4,5,6]]
my_tensor = torch.tensor(data)
```

Create Tensor with shape:
```python
shape = (2,3)
ones = torch.ones(shape)
zeros = torch.zeros(shape)
random = torch.randn(shape)
```

Create Tensor with same shape as other Tensor:
```python
tensor1 = torch.tensor([[1,2], [3,4]])
tensor2 = torch.randn_like(tensor1, dtype=torch.float)
```

## Shape, Type, Device

- **Shape**: Tuple that describes the dimensions of the tensor
- **Device**: where the Tensor is located/processed
- **dtype**: the data type of the tensor (default is `float32`)

## Autograd

- **Autograd** is the automatic gradient calculator.
- Enabled by setting `requires_grad = True`; this flag tells Torch that the parameter is learnable.
```python
# fixed data
x = torch.tensor([[1., 2.], [3., 4.]])

# learnable weights require gradients
w = torch.tensor([[1.0], [2.0]], requires_grad = True)
```

Example:
```python
# solve z = x * y 
# where y = a+b

# setup parameters with initial values
a = torch.tensor(2., requires_grad = True)
b = torch.tensor(3., requires_grad = True)
x = torch.tensor(4., requires_grad = True)

# define computation graph
y = a + b
z = x * y

# compute and print result
print(f"Result: {n}")
```

## Operations

| Operation | Description                 | Preconditions                                          |
| :-------: | --------------------------- | ------------------------------------------------------ |
|    `*`    | Element-wise multiplication | Tensors need to have the same shape                    |
|    `@`    | Matrix multiplication       | Rows of left tensor must match columns of right tensor |

Example:
```python
a = torch.tensor([[1,2], [3,4]])
b = torch.tensor([[10,20], [30,40]])
x = a * b # [[1*10, 2*20], [3*30, 4*40]]
```

```python
a = torch.tensor([
	[1, 2, 3],
	[4, 5, 6]
])

b = torch.tensor(
[
	[ 7,  8],
	[ 9, 10],
	[11, 12]
])

x = a @ b
```

### Reductions

- **Reductions** are operations that reduce the size of the Tensor.
- **dim** argument defines which dimensions should be collapsed.

| Operation  | Description                                   |
| :--------: | --------------------------------------------- |
|  `sum()`   | Sum value                                     |
|  `mean()`  | Average value                                 |
|  `max()`   | Maximum value                                 |
| `argmax()` | Index of maximum value                        |
| `gather()` | Select specific values by index per dimension |

Example:
```python
s = torch.tensor(
[
	[10., 20., 30.],
	[ 5., 10., 15.]
])

# calculate the overall mean value
mean = s.mean() # 15.0

# collapse the 0th dimension
mean = s.mean(dim=0) # [7.5, 15.0, 22.5]

# collapse the 1th dimension
mean = s.mean(dim=1) # [20.0, 10.0]
```

## Indexing

Indices select blocks of data from a tensor.
```python
x = torch.arrange(12).reshape(3,4) # [[0,1,2,3], [4,5,6,7], [8,9,10,11]]

# select column 2
col = x[:, 2] # [2, 6, 10]

# get indices with maximum values of dimension 1
ids = torch.argmax(x, dim=1) # [4,4,4]
```

Gathering
```python
data = torch.tensor(
[
	[10, 11, 12, 13],
	[20, 21, 22, 23],
	[30, 31, 32, 33]
])

indices = torch.tensor([[2], [0], [3]])
values = torch.gather(data, dim=1, index=indices) # [[12], [20], [33]]
```

## Model

A Linear Regression model is defined as $\hat{y} = X W + b$, where
- $X$ is the input *data*
- $W$ are the *weight*
- $b$ is the *bias*

Create data:
```python
# Our batch of data will have 10 data points
N = 10

# Each data point has 1 input feature and 1 output value
D_in = 1
D_out = 1

# Create our input data X
X = torch.randn(N, D_in)

# Create our true target labels y by using the "true" W and b
# The "true" W is 2.0, the "true" b is 1.0
true_W = torch.tensor([[2.0]])
true_b = torch.tensor(1.0)

# Add a little noise
y_true = X @ true_W + true_b + torch.randn(N, D_out) * 0.1
```

Initialize parameters:
```python
# Initialize our parameters with random values.
# Shapes must be correct for matrix multiplication!
W = torch.randn(D_in, D_out, requires_grad=True)
b = torch.randn(1, requires_grad=True)
```

Forward pass:
```python
# calculate result using random initialization values
y_hat = model(X_train)
```

Backward pass:
```python
# determine the error using a loss function
# e.g. using Mean Squared Error (MSE)
error = y_hat - y_true
squared_error = error ** 2
loss = squared_error.mean()

# calculate gradients of weights and biases
loss.backward()

# print the calculated gradients
print(f"Gradient for W (∂L/∂W): {W.grad}\n")
print(f"Gradient for b (∂L/∂b): {b.grad}\n")
```

## Sources

- [YouTube: PyTorch in 1 Hour](https://www.youtube.com/watch?v=r1bquDz5GGA)
