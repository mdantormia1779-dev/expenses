💰 Expense Tracker Application
A full-stack Expense Tracker web application that allows users to manage, track, and visualize their daily expenses with an interactive dashboard.

🚀 Live Project
LIve Link: https://expenses-xi-five.vercel.app

📂 GitHub Repository
🔗 Repository Link: 
Server: https://github.com/mdantormia1779-dev/expensesserver.git
Client: https://github.com/mdantormia1779-dev/expenses.git

🛠️ Tech Stack
Frontend:
React.js
Next.js
TypeScript
Tailwind CSS
Recharts
Backend:
Node.js
Express.js
MongoDB

✨ Features
✅ Add, update, and delete expenses
📊 Visualize expenses using charts (Pie Chart)
🔄 Real-time UI updates using custom events
📱 Responsive design
⚡ Fast and optimized performance
🔐 Clean and structured API

⚙️ Setup Instructions
🔹 1. Clone the Repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker


🔹 2. Setup Backend
cd server
npm install

Create .env file:
PORT=5000
DB_URL=your_mongodb_connection_string

Run Backend:
npm run dev


🔹 3. Setup Frontend
cd client
npm install

Create .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:5000

Run Frontend:
npm run dev


📊 API Endpoints
Method
Endpoint
Description
GET
/expenses
Get all expenses
POST
/expenses
Add new expense
PUT
/expenses/:id
Update expense
DELETE
/expenses/:id
Delete expense



