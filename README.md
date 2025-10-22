📘 Frontend – Todo Application

Frontend UI for the Todo Manager application.
Built with React + TypeScript, it allows users to manage categorized tasks with Undo notifications and category-based limits.

🧩 Tech Stack

⚛️ React 19 + TypeScript — component-based UI

🧰 React Hook Form — form handling and validation

📡 Axios — API communication

🎨 CSS Modules  — clean and responsive styling

🔔 React Toastify — notifications and Undo snackbar


🚀 Functionality

Create new tasks (text + category)

View all tasks or filter by category

Mark tasks as completed

Delete tasks

Undo snackbar when deleting or completing a task

Category limit: max 5 tasks per category

System states:

Loading (spinner)

Error (error message)

Empty list (“No tasks”)

🧠 Core Hooks

useTodos — handles fetching, updating, and filtering todos

useTemporaryDelete — temporary delete logic with Undo

useDeleteTimers — manages delayed deletion timers

useUndoToast — handles toast notifications with Undo button


⚙️ Setup & Run

Clone the project

git clone https://github.com/braz-bogdan156/ui-top_frontend

cd frontend


Install dependencies

npm install


Configure API URL
Create a .env file in /frontend:

REACT_APP_BACKEND_URL=http://localhost:7000

Run the development server

npm start

The app will be available at 👉 http://localhost:3000