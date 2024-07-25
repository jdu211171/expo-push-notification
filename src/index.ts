import express from 'express';
const port = 3000;
const app = express();

/*Middleware start*/
app.use(express.json());
/*Middleware end*/

/*Ending process start*/
process.on('SIGINT', async () => {
    process.exit(0);
});

process.on('SIGTERM', async () => {
    process.exit(0);
});
/*Ending process end*/

app.listen(port, () => console.log(`Server is listening on ${port}`));
