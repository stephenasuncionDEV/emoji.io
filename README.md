<p align="center">
    <a href='https://www.nfthost.app/' rel='nofollow'>
        <img src='./client/public/assets/images/logo.png' alt='emoji.io Logo' style="width: 100px" />
    </a>
</p>

<h1 align="center">emoji.io</h1>

<p align="center">
    <img src='https://github.com/stephenasuncionDEV/emoji.io/actions/workflows/docker-deployment-backend.yml/badge.svg' alt='Docker Deployment Backend'>
    <img src='https://github.com/stephenasuncionDEV/emoji.io/actions/workflows/docker-deployment-client.yml/badge.svg' alt='Docker Deployment Client'>
</p>

<p align="center">
    emoji.io is a multiplayer online action game created by Filipino developer Stephen Asuncion.
</p>

<p align="center">
    Demo:
    <a href="https://www.youtube.com/watch?v=YdUsmb0gI7c" target="_blank">
        https://www.youtube.com/watch?v=YdUsmb0gI7c
    </a>
</p>

## Setup

[DockerHub: Client](https://hub.docker.com/repository/docker/stephenasuncion/emoji.io)

[DockerHub: Server](https://hub.docker.com/repository/docker/stephenasuncion/emoji.io-api)

Running with Docker Hub:

```
Client:
docker pull stephenasuncion/emoji.io:main
docker container run --name client -p 3000:3000 stephenasuncion/emoji.io:main

Server:
docker pull stephenasuncion/emoji.io-api:main
docker container run --name server -p 8080:8080 stephenasuncion/emoji.io-api:main
```

Running with Terminal:

```
npm run dev (on both api and client folders)
```

## Technologies

The `api` folder was deployed to heroku, while `client` folder was deployed to netlify.

![Technologies](https://skillicons.dev/icons?i=nodejs,express,nextjs,netlify,heroku,firebase,mongodb,sass,docker,git&theme=light)

Other: [Socket.io](https://socket.io/), [Chakra UI](https://chakra-ui.com/), [Stripe](https://stripe.com/), [Twilio](https://www.twilio.com/), [MailJet](https://www.mailjet.com/)

## Support

If you need help with anything please contact us on [Discord](https://discord.gg/BMZZXZMnmv)

Want to donate? [https://www.buymeacoffee.com/stephenasuncion](https://www.buymeacoffee.com/stephenasuncion)

## License

[Apache License Version 2.0](https://github.com/stephenasuncionDEV/emoji.io/blob/main/LICENSE)
