pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Run CI/CD') {
            steps {
                echo "=== Starting pipeline inside workspace ==="

                // تثبيت الاعتماديات
                echo "=== Installing dependencies ==="
                sh 'npm install'

                // تشغيل Prettier (formatting)
                echo "=== Running Prettier (formatting) ==="
                sh 'npx prettier --write .'

                // تشغيل ESLint (code check)
                echo "=== Running ESLint (code check) ==="
                sh 'npx eslint .'

                // تشغيل الاختبارات
                echo "=== Running Tests ==="
                sh 'npm test'

                // بناء Docker image
                echo "=== Building Docker image ==="
                sh 'docker build -t teamavail-app .'

                // تشغيل Docker Compose
                echo "=== Starting Docker Compose ==="
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
}
