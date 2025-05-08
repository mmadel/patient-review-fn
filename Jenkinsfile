pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18' // Assumes a Node.js tool named 'NodeJS_18' is configured in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') { // Change this if your Angular project is in a different folder
                    sh 'npm ci' // Use `npm install` if `package-lock.json` is not used
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('frontend') {
                    sh 'npm run build -- --configuration=production'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/dist/**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Angular build completed successfully.'
        }
        failure {
            echo 'Angular build failed.'
        }
    }
}
