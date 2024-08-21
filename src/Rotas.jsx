import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';

import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from './views/cliente/ListCliente';
import ListEntregador from './views/entregador/ListEntregador';
import ListProduto from './views/produto/ListProduto';
import FormPromocao from './views/promocao/FormPromocao';
import ListPromocao from './views/promocao/ListPromocao';
import FormLogin from './views/login/FormLogin';


function Rotas() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <FormLogin />
                    }
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="form-cliente"
                    element={
                        <ProtectedRoute>
                            <FormCliente />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="list-cliente"
                    element={
                        <ProtectedRoute>
                            <ListCliente />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="form-produto"
                    element={
                        <ProtectedRoute>
                            <FormProduto />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="list-produto"
                    element={
                        <ProtectedRoute>
                            <ListProduto />
                        </ProtectedRoute>
                    }
                />
                <Route

                    path="form-entregador"
                    element={
                        <ProtectedRoute>
                            <FormEntregador />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="list-entregador"
                    element={
                        <ProtectedRoute>
                            <ListEntregador />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="form-promocao"
                    element={
                        <ProtectedRoute>
                            <FormPromocao />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="list-promocao"
                    element={
                        <ProtectedRoute>
                            <ListPromocao />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    )
}

export default Rotas
