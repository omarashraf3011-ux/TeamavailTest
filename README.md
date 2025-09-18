# Team Availability – Hands-on Task

Hello Konecta team !  
Welcome to the first Hands-on experience task **"Team Availability"**.  
This is **Omar Ashraf** and here's what I did in this task:

---

### 📌 What was done in this project?

1. **Project Setup**  
   - Initialized a Node.js project with Express server.  
   - Configured project dependencies (`express`) and dev tools (`eslint`, `prettier`, `jest`, `supertest`).  

2. **Code Quality & Formatting**  
   - Added ESLint and Prettier for code consistency and clean formatting.  
   - Automated checks inside the CI pipeline.  

3. **Testing**  
   - Implemented Jest + Supertest for unit/integration testing.  
   - Created a `tests/` folder to validate API endpoints (e.g., `GET /`, `POST /save-history`).  
   - Tests ensure any new changes don’t break existing functionality.  

4. **CI/CD Pipeline**  
   - Wrote a `ci.sh` script that:  
     - Runs Prettier & ESLint.  
     - Installs dependencies.  
     - Executes all tests.  
     - Builds a Docker image.  
     - Runs the app with Docker Compose.  

5. **Containerization**  
   - Created a Dockerfile and docker-compose.yml to containerize the app.  
   - Used Node.js 20 Alpine image for lightweight performance.  

---

### 📂 Documentation
You can find **detailed explanation and screenshots** inside the folder:  
`Task Documentation/`

- `Task_Documentation.pdf` → includes full explanation with colors and screenshots.  
- `Task_Documentation.md` → contains the same explanation in Markdown format.  

Hopefully this makes the setup and steps easier to follow 🚀  

---

Best regards,  
✨ **Omar Ashraf** ✨
