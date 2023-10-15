pipeline {
  agent any

   environment {
        DOCKER_IMAGE_NAME = 'hico-frontend-image'
        DOCKER_IMAGE_TAG = 'latest'
        DOCKER_HUB_REGISTRY = 'docker.io'
        DOCKER_HUB_USERNAME= 'gneisscode'
    }

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

    stage('Push to Docker Hub') {
            steps {
                script {
                    // Use Docker Hub credentials from Jenkins
                    withCredentials([usernamePassword(credentialsId: '07a4bb91-a8a5-4ea9-b5a0-3dcab388c18c', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        // Log in to Docker Hub
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD} ${DOCKER_HUB_REGISTRY}"

                        // Tag the Docker image
                        sh "docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_HUB_REGISTRY}/${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

                        // Push the Docker image to Docker Hub
                        sh "docker push ${DOCKER_HUB_REGISTRY}/${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    }
                }
            }

  }
}