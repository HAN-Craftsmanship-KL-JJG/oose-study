class Product {
    [string]$Name
    [double]$Price

    Product([string]$name, [double]$price) {
        $this.Name = $name
        $this.Price = $price
    }
}

class OrderLine {
    hidden [Product]$product
    hidden [int]$quantity

    OrderLine([Product]$product, [int]$quantity) {
        $this.product = $product
        $this.quantity = $quantity
    }

    [double] Subtotal() { return $this.product.Price * $this.quantity }
}

class Order {
    hidden [System.Collections.Generic.List[OrderLine]]$lines =
        [System.Collections.Generic.List[OrderLine]]::new()

    # Creator: Order contains its lines, so Order creates them.
    [void] Add([Product]$product, [int]$quantity) {
        $this.lines.Add([OrderLine]::new($product, $quantity))
    }
}

# The caller never writes [OrderLine]::new():
$order.Add($bike, 1)
