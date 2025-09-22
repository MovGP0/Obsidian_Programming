Encapsulate different algorithms to choose them at runtime.

```rust
trait SortStrategy {
    fn sort(&self, arr: &mut [i32]);
}

struct BubbleSort;

impl SortStrategy for BubbleSort {
    fn sort(&self, arr: &mut [i32]) {
        let n = arr.len();
        for i in 0..n {
            for j in 0..n-i-1 {
                if arr[j] > arr[j+1] {
                    arr.swap(j, j+1);
                }
            }
        }
    }
}

struct QuickSort;

impl SortStrategy for QuickSort {
    fn sort(&self, arr: &mut [i32]) {
        if arr.len() > 1 {
            let pivot = arr[arr.len() - 1];
            let mut i = 0;
            for j in 0..arr.len() - 1 {
                if arr[j] < pivot {
                    arr.swap(i, j);
                    i += 1;
                }
            }
            arr.swap(i, arr.len() - 1);
            let (left, right) = arr.split_at_mut(i);
            QuickSort.sort(left);
            QuickSort.sort(&mut right[1..]);
        }
    }
}

struct Sorter {
    strategy: Box<dyn SortStrategy>,
}

impl Sorter {
    fn new(strategy: Box<dyn SortStrategy>) -> Sorter {
        Sorter { strategy }
    }

    fn sort(&self, arr: &mut [i32]) {
        self.strategy.sort(arr);
    }
}

fn main() {
    let mut arr = [2, 1, 4, 3, 5];
    let bubble_sort = BubbleSort;
    let quick_sort = QuickSort;

    let mut sorter = Sorter::new(Box::new(bubble_sort));
    sorter.sort(&mut arr);
    println!("Bubble Sort: {:?}", arr);

    let mut sorter = Sorter::new(Box::new(quick_sort));
    sorter.sort(&mut arr);
    println!("Quick Sort: {:?}", arr);
}
```