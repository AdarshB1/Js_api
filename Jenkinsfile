pipeline {
    agent any
     
    environment {
        NODEJS_HOME = tool 'NodeJS'
         SONARQUBE_SCANNER_HOME = tool 'SonarqubeScanner-5.0.1'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',  // Adjust branch as needed
                    url: 'https://github.com/AdarshB1/Js_api.git'  // Replace with your repo URL
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
