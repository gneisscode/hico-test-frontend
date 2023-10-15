pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        script {
          sh 'docker build -t hico-frontend-image:latest -f client/Dockerfile.client .'
        }

      }
    }

  }
}