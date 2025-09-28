# Project-node.js


פרויקט Node.js + Express + MongoDB


## דרישות
Node.js >= 18, MongoDB, npm


## התקנה
1. `git clone ...`
2. `npm install`
3. העתק `.env.example` -> `.env` והזן משתנים
4. `npm run dev`


## סקריפטים
`start`, `dev`, `lint`, `test`


## בעיות נפוצות
- ודא סדר middleware: logger -> cors -> routes -> error handler
- ודא `MONGO_URI` תקין
- בדוק חוקים של הסיסמה והתחשבות ב-bcrypt
