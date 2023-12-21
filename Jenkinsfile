pipeline {
    agent any
    tools {
        git 'Git'
    }
 
    environment {
        NODEJS_HOME = tool 'NodeJS'
         SONARQUBE_SCANNER_HOME = tool 'SonarqubeScanner5.0.1'
    }

    stages {
        stage('Checkout repo') {
            steps {
                git branch: 'main',  // Adjust branch as needed
                    url: 'https://github.com/AdarshB1/react_eslint.git'  // Replace with your repo URL
            }
        }
 
        stage('Install Dependencies') {
            steps {
                script {
                    def npm = tool 'NodeJS'
                    sh "${npm}/bin/npm install"
                }
            }
        }
 
 
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
 
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube9.9.3') {  // Replace with your SonarQube server name
                    sh "${tool("sonarscan")}/bin/sonar-scanner \
                        -Dsonar.projectKey=your-project-key \
                        -Dsonar.sources=. \
                        -Dsonar.tests=. \
                        -Dsonar.exclusions=**/node_modules/**"
                }
            }
        }
    }
}