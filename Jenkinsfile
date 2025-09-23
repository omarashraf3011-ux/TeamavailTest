pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        DOCKERHUB_CREDENTIALS = credentials('docker-hub') 
        IMAGE_NAME = "omarashraf3011/teamavail-app"
    }

    stages {
        stage('Run CI/CD') {
            steps {
                echo "=== Starting pipeline inside workspace ==="

                echo "=== Installing dependencies ==="
                sh 'npm install'

                echo "=== Running Prettier (formatting) ==="
                sh 'npx prettier --write .'

                echo "=== Running ESLint (code check) ==="
                sh 'npx eslint .'

                echo "=== Running Tests ==="
                sh 'npm test'

                echo "=== Building Docker image ==="
                sh "docker build -t $IMAGE_NAME:latest ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo "=== Logging in to Docker Hub ==="
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "=== Pushing image to Docker Hub ==="
                sh "docker push $IMAGE_NAME:latest"
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "=== Pulling latest image from Docker Hub ==="
                sh 'docker-compose pull'

                echo "=== Starting Docker Compose with latest image ==="
                sh 'docker-compose up -d --force-recreate'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully , Great Job !"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
}
