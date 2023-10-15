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

    stage('Build Images') {
      steps {
        script {
          sh 'docker build -t hico-frontend-image:latest -f Dockerfile.client .'
        }

      }
    }

  }
}