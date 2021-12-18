import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';
import userEvent from "@testing-library/user-event";
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";

beforeAll(() => { server.listen() })
afterEach(() => { server.resetHandlers() })
afterAll(() => { server.close() })

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe('Product form creat tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('should render Form', async () => {
        render(

            <Router history={history}>
                <Form />
                <ToastContainer />
            </Router>

        )

        const nameImput = screen.getByTestId('name');
        const priceImput = screen.getByTestId('price');
        const imgUrlImput = screen.getByTestId('imgUrl');
        const descriptionImput = screen.getByTestId('description');
        const categoriesImput = screen.getByLabelText("Categorias");

        const submitButton = screen.getByRole('button', { name: /salvar/i })

        await selectEvent.select(categoriesImput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameImput, 'Computador');
        userEvent.type(priceImput, '2345.76');
        userEvent.type(imgUrlImput, 'http://www.google.com/img.jpg');
        userEvent.type(descriptionImput, 'O melhor');

        userEvent.click(submitButton);

        await waitFor(() => {

            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();
        })

        expect(history.location.pathname).toEqual('/admin/products');
    });
});


