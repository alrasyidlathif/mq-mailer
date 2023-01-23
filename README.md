## Mailer Service

### Features:
1. Send An Email To Someone

### How To:
1. Create A HTTP POST Request To
```
- request
url: http://localhost:8080/mail
body {
    to: 'email_destination',
    title: 'the title of your email',
    body: 'the body of your email'
}
- response 
status 200
```

### Installation And Configuration:
1. open your terminal/cmd
2. clone this project
#### mail-sender
3. go to the root directory/mail-sender
4. install all dependencies with run 
```
npm install
```
5. to start the mail-sender app run
```
npm start
```
#### rabbitmq
6. install and start the rabbitmq, if you use docker open your terminal/cmd then run
```
docker run --name rabbitmq -p 5672:5672 rabbitmq
```
#### mail-service
7. go to the root directory/mail-service
8. create a .env file
```
USER=YOUR_EMAIL
PASS=YOUR_APP_PASSWORDS
```
9. To Get Your YOUR_APP_PASSWORDS Go To This Link Below
```
https://support.google.com/accounts/answer/185833
```
10. install all dependencies with run 
```
npm install
```
11. to start the mail-service app run
```
npm start
```

### Stack:
Rabbitmq, Nodemailer, full list see package.json
