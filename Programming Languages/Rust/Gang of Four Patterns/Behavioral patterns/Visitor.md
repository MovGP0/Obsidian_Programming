separates an algorithm from an object structure on which it operates. It allows adding new operations to an object structure without modifying the objects themselves

```rust
trait Element {
    fn accept(&self, visitor: &mut Visitor);
}

struct ConcreteElementA;

impl Element for ConcreteElementA {
    fn accept(&self, visitor: &mut Visitor) {
        visitor.visit_element_a(self);
    }
}

struct ConcreteElementB;

impl Element for ConcreteElementB {
    fn accept(&self, visitor: &mut Visitor) {
        visitor.visit_element_b(self);
    }
}

trait Visitor {
    fn visit_element_a(&mut self, element: &ConcreteElementA);
    fn visit_element_b(&mut self, element: &ConcreteElementB);
}

struct ConcreteVisitorA;

impl Visitor for ConcreteVisitorA {
    fn visit_element_a(&mut self, element: &ConcreteElementA) {
        println!("Visitor A: visiting element A");
    }

    fn visit_element_b(&mut self, element: &ConcreteElementB) {
        println!("Visitor A: visiting element B");
    }
}

struct ConcreteVisitorB;

impl Visitor for ConcreteVisitorB {
    fn visit_element_a(&mut self, element: &ConcreteElementA) {
        println!("Visitor B: visiting element A");
    }

    fn visit_element_b(&mut self, element: &ConcreteElementB) {
        println!("Visitor B: visiting element B");
    }
}

struct ObjectStructure {
    elements: Vec<Box<dyn Element>>,
}

impl ObjectStructure {
    fn add_element(&mut self, element: Box<dyn Element>) {
        self.elements.push(element);
    }

    fn accept(&self, visitor: &mut Visitor) {
        for element in self.elements.iter() {
            element.accept(visitor);
        }
    }
}

fn main() {
    let mut object_structure = ObjectStructure {
        elements: Vec::new(),
    };

    object_structure.add_element(Box::new(ConcreteElementA));
    object_structure.add_element(Box::new(ConcreteElementB));

    let mut visitor_a = ConcreteVisitorA;
    object_structure.accept(&mut visitor_a);

    let mut visitor_b = ConcreteVisitorB;
    object_structure.accept(&mut visitor_b);
}
```
