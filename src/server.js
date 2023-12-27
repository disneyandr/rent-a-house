import app from './app';

// Obtém a porta da variável de ambiente, ou usa a porta 8080 como padrão
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// https://dashboard.render.com/
