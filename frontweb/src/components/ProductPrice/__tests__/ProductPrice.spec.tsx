import { render, screen } from "@testing-library/react";
import ProductPrice from "..";


test('should render ProductPrice', () => {
    
    //ARRANGE
    const price = 10.1; 
    //ACT
    render(
        <ProductPrice price ={price} />
    )
    //ASSERT

    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("10,10")).toBeInTheDocument();
});