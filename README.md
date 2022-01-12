# NLW-Valoriza

## Day 2 - Maximum Speed
### Métodos http

GET    => Buscar uma informação 
POST   => Inserir (Criar) uma informação
PUT    => Alterar uma informação
DELETE => Remover um dado
PATCH  => Alterar uma informação específica

### Tipos de Parâmetros

Route Params => https://localhost:3000/produtos/24378942364
- Não Obrigatórios

Query Params => https://localhost:3000/produtos?name=teclado&description=tecladobom
- Obrigatórios

Body Params => {
"name": "teclado",
"description": "teclado bom"   
}

#### Exemplos:
app.get('/test' , (request, response) => {
    // Request => Entrando
    // Response => Saindo
    return response.send('Olá NLW');
});

app.post('/test-post', (request, response) => {
    return response.send('Eu sou o método POST :)')
})