אפליקציית Full Stack – צד שרת (Node.js + Express + MongoDB)

מחברת: אורטל נגוסה

טכנולוגיות: Node.js, Express, MongoDB, Mongoose, RESTful API, Middleware, Joi

📖 תיאור הפרויקט

פרויקט זה מהווה צד שרת של אפליקציית פולסטאק, שמטרתו לנהל כרטיסים דינמיים במסד נתונים.
ה־API מאפשר ביצוע פעולות CRUD (יצירה, קריאה, עדכון ומחיקה) על כרטיסים, כולל אפשרויות חיפוש וסינון.

🛠️ טכנולוגיות ושימושים

Node.js & Express – לבניית שרת ו־API

MongoDB & Mongoose – ניהול מסד הנתונים

Joi – אימות נתונים

Middleware – טיפול בשגיאות ואימות בקשות

🚀 איך להפעיל את הפרויקט

Clone את הריפו:

git clone https://github.com/ortalnagosa/Project-node.js.git


התקן את התלויות:

cd Project-node.js
npm install


הרץ את השרת:

npm start


ה־API ירוץ כברירת מחדל על http://localhost:3000

📂 מבנה הפרויקט
Project-node.js/
│
├─ src/
│  ├─ controllers/      # לוגיקה עסקית של ה-API
│  ├─ routes/           # הגדרת הנתיבים (Endpoints)
│  ├─ models/           # סכימות MongoDB
│  └─ middleware/       # טיפול בשגיאות ואימות
│
├─ package.json
└─ server.js

🔗 דוגמת Endpoints
פעולה	Method	Endpoint	תיאור
קבלת כל הכרטיסים	GET	/cards	מחזיר את כל הכרטיסים
יצירת כרטיס חדש	POST	/cards	יוצר כרטיס חדש במסד הנתונים
עדכון כרטיס	PUT	/cards/:id	מעדכן כרטיס קיים לפי ID
מחיקת כרטיס	DELETE	/cards/:id	מוחק כרטיס לפי ID

דוגמה ל־JSON בעת יצירת כרטיס:

{
  "title": "כרטיס חדש",
  "description": "תיאור הכרטיס",
  "category": "משחק"
}

💡 הערות

ניתן לחבר בעתיד את צד ה־Frontend (React) ל־API הזה.

הפרויקט מהווה בסיס טוב ללימוד RESTful API ו־Node.js עם MongoDB.

📌 קישור לגיט

🔗 https://github.com/ortalnagosa/Project-node.js
