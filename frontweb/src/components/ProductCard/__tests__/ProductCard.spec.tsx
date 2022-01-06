import { render, screen } from "@testing-library/react";
import { Product } from "types/product"
import ProductCard from "..";


test('should render ProductCard', () => {

    //ARRANGE
    const product: Product = {
        name: "Computador",
        price: 2345.87,
        imgUrl: "http://www.google.com/image.jpg"
    } as Product;

    //ACT
    render(
        <ProductCard product={product} />
    )
    //ASSERT

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("2.345,87")).toBeInTheDocument();

});