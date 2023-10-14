pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Client Tests') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}
