
- I started by **forking the project** to my own GitHub account.
    
- Then, I **cloned the repository** to my local machine, so I had the full project files available for development.
    
- Inside the project, I added the following configuration files to manage code quality:
    
    - `.eslintrc.json` – for JavaScript linting rules.
        
    - `.prettierrc` – to enforce consistent code formatting.
        

This setup ensures that both linting and formatting rules are applied consistently as I work on the project locally.

![[Screenshot 2025-09-17 at 12.58.06 PM.png]] 

## Prettier Test

After setting up the `.prettierrc` file, I ran a quick check to see if the existing code follows the formatting rules:

`npx prettier --check .`

The command scanned the project files and returned **errors**, indicating that some files did not follow the Prettier formatting rules.

> _This helped me identify areas in the code that needed formatting fixes before continuing with the pipeline setup._

![[Screenshot 2025-09-17 at 1.01.07 PM.png]]
## Fixing Prettier Errors

After seeing the formatting errors, I ran the following command to automatically fix them:

`npx prettier --write .`

This command **rewrites the code files** so that they comply with the rules defined in `.prettierrc`. Essentially, it saves time by automatically formatting everything instead of fixing each file manually.

The command successfully updated the files, and the terminal output confirmed that all formatting issues were resolved.

> _This ensured that the project had a consistent code style, which is crucial before moving on to linting, testing, and building the CI/CD pipeline._
![[Screenshot 2025-09-17 at 1.04.09 PM.png]] 
Next, I ran **ESLint** to check for potential code errors or issues:

`npx eslint .`

- I had to **install an older version** of ESLint because the latest version wasn’t working properly on my machine.
    
- Using the older version worked perfectly, and **no errors were reported** in the project.
![[Screenshot 2025-09-17 at 1.14.46 PM.png]] 
## Creating the CI Script (`ci.sh`)

The next and most important step was to **automate everything locally** using a Bash script (`ci.sh`).

- Up to this point, I had been running **Prettier** and **ESLint** manually to check for formatting and code errors.
    
- The task required automating these checks, along with installing dependencies and starting the project, so I could run everything with a single command.
    

### My Approach

Before writing the full CI/CD script with Docker and Docker Compose, I first created a **minimal version** to test the automation.

The script performs the following steps:

1. **Running Prettier** – automatically formats the code.
    
2. **Running ESLint** – checks the code for errors or issues.
    
3. **Installing dependencies** – ensures all required packages are available.
    
4. **Starting the project** – launches the app locally.
    

### Making the Script Executable

To run the script, I had to make it executable using:

`chmod +x ci.sh`

Once the permissions were set, I ran the script:

`./ci.sh`

The command executed all the steps automatically, and the terminal output confirmed that everything worked as expected.

![[PHOTO-2025-09-17-13-24-04.jpg]] 
![[Screenshot 2025-09-17 at 1.26.26 PM.png]] 
## Dockerizing the Application

After confirming that all previous steps worked correctly (I like to **verify each step** to easily spot any errors), the next step was to **containerize the Node.js application**.

- I needed to create a **Dockerfile** that would build the image for my app.
    
- The Dockerfile, along with all the additional files I added (like `.eslintrc.json` and `.prettierrc`), was already pushed to my GitHub repository.
    

### Building the Docker Image

I built the Docker image using the following command:

`docker build -t teamavail-app .`

- This created a Docker image named `teamavail-app`.
    
- Once the build was complete, I was ready to run the app in a container.
-Screenshot while building the image : 

![[Screenshot 2025-09-17 at 1.49.52 PM.png]] 
And it works ! 
![[Screenshot 2025-09-17 at 2.22.31 PM.png]] 
## Setting Up Docker Compose

The next step was to create a **`docker-compose.yml`** file.

- This allows me to **run the project along with any additional services** easily (for example, Redis or PostgreSQL if we add them later).
    
- Docker Compose simplifies managing multiple containers and their dependencies, volumes, and ports in one place.
    

### Running the Project with Docker Compose

Initially, I ran:

`docker-compose up`

However, I got the following error:

`Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint teamavailtest-app-1 (c1ef5e851464165e7be32074c505ddc8a9331945f933905c1fd6da05b44746e0): Bind for 0.0.0.0:3000 failed: port is already allocated`

- This was expected because I already had the application running locally on **port 3000**.
    
- To solve this, I configured Docker to run the container on **port 3001**, while keeping the local app on port 3000.
    

### Final Setup

- Local app: `http://localhost:3000`
    
- Docker container: `http://localhost:3001`
    

Both instances ran **simultaneously without conflicts**, confirming that the Docker Compose setup works as intended.

_(Screenshots showing both the local app on port 3000 and the Docker container on port 3001 go here)
![[Screenshot 2025-09-17 at 2.41.03 PM.png]] 
![[Screenshot 2025-09-17 at 2.41.31 PM.png]] 
## Adding Tests and Updating `ci.sh`

To make sure the project meets **100% of the task requirements**, I needed to **add automated testing**.

### Adding Tests

1. I updated the **`package.json`** to include a test script:
    

`"scripts": {   "test": "jest",   "start": "node server.js" }`

2. Created a separate **`tests` folder** to hold test files.
    
    - For example, `server.test.js` contains tests for the application.
        

This ensures that the project can be tested automatically as part of the CI/CD pipeline.

### Updating `ci.sh`

After confirming that all previous steps worked correctly, I updated the **`ci.sh` script** to run the **full automated workflow**, including tests.

The updated script now runs:

1. **Prettier** – format the code automatically.
    
2. **ESLint** – check for linting issues.
    
3. **Tests** – run `jest` to verify the application works as expected.
    
4. **`npm install`** – install all dependencies.
    
5. **Docker build** – build the Docker image.
    
6. **Docker Compose up** – start the app along with any configured services.
    

> _Now, running `./ci.sh` executes the full workflow automatically, including formatting, linting, testing, dependency installation, and starting the app in Docker. This makes the project fully compliant with the task requirements._

![[Screenshot 2025-09-17 at 3.05.44 PM.png]] 
![[Screenshot 2025-09-17 at 3.06.03 PM.png]] 
![[Screenshot 2025-09-17 at 3.06.19 PM.png]] 
![[Screenshot 2025-09-17 at 3.06.30 PM.png]] 
## Test Warnings

While running the tests, everything worked fine except for **one warning** in `tests/server.test.js`:

`3:7  error  'express' is assigned a value but never used  no-unused-vars`

- This is just a **linting warning** indicating that the `express` variable is imported but not used in the test file.
    
- It **does not affect the application** or any of the CI/CD workflow steps.
    

> _Warnings like this are common in test files, especially when placeholders or sample tests are added._

