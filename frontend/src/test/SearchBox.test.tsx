import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchBox from '../pages/SearchBox';

test('Renderiza el logo, el input y el boton', () => {
    render(
        <BrowserRouter>
            <SearchBox />
        </BrowserRouter>
    );
    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeDefined();
    const inputElement = screen.getByPlaceholderText("Nunca dejes de buscar");
    expect(inputElement).toBeDefined();
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDefined();
});



test('Redirige a "/" al hacer clic en el logo', () => {
    render(
        <BrowserRouter>
            <SearchBox />
        </BrowserRouter>
    );
    const logoElement = screen.getByTestId("logo");
    fireEvent.click(logoElement);
    expect(window.location.pathname).toBe('/');
});



test('Envia el formulario con el valor del input', () => {
    render(
        <BrowserRouter>
            <SearchBox />
        </BrowserRouter>
    );
    const input = screen.getByTestId("input-form") as HTMLInputElement;
    const button = screen.getByTestId("button-form");
    fireEvent.change(input, { target: { value: 'Jeremias' } });
    expect(input.value).toBe('Jeremias');
    fireEvent.click(button);
});



test('No navega si el input está vacio', () => {
    const navigate = vi.fn();
    render(
        <BrowserRouter>
            <SearchBox />
        </BrowserRouter>
    );
    const button = screen.getByTestId('button-form');
    fireEvent.click(button);
    expect(navigate).not.toHaveBeenCalled();
});