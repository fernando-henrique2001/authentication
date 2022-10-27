import { app } from './app';

app.listen(process.env.PORT_APP, () => {
    console.log(
        `
        Yep this is working 🍺 🎉
        App listen on port: ${process.env.PORT_APP} 🥷
        `
    );
});

