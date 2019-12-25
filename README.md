## What Is This?

Rak Buku is An App For Manage Your Reading Life Style, You Can Bookmark, Wishlist, Dropped, Like, Dislike, Even Review Book That Already You Read.

Rak Buku has separated environment for Server-Side and Client-Side. And this Repo Is For Client-Side.

This Client-Side functionate as Front-End and Process Data from Client-Side and Show it To User. Rak-Buku Client-Side use SPA Technology. You Can Find Server-Side Repo In Here [Rak-Buku-Web](https://github.com/IrhamMaulani/rak-buku-web).

Technology Used for this client-side is Javascript with VueJs Framework 2.6.10 version.

## About Score

For Scoring, Rak-Buku used This

```sh
Formula

Weighted Rank (WR) = (v / (v + m)) * S + (m / (v + m)) * C
S = Average score for the Book(mean).
v = Number of votes for the Book= (Number of people scoring the Book).
m = Minimum votes/scores required to get a calculated score (currently 50 scores required).
C = The mean score across the entire Book DB.
```

For more Detailed Check syncAllScore function in ScoreService file

## How To Install

- Install [NPM](https://www.npmjs.com/)

## Configure Env Config File

create .env file in root folder (same location as this README). And Copy This

```javascript
VUE_APP_TITLE = Rak Buku
VUE_APP_URL  = YOUR CLIENT-SIDE URL IN LOCAl
VUE_APP_API = YOUR SERVER-SIDE URL IN LOCAL
```

Example

```javascript
VUE_APP_TITLE = Rak Buku
VUE_APP_URL  = http://192.168.1.71:8080/
VUE_APP_API = http://localhost/rak-buku-web/public/api/
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## DEMO

You can visit demo here

## Account

```
Admin
 - UserName : moderator
 - Password : moderator123456789

User
 - UserName : user
 - Password : user123456789
```
