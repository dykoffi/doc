pipeline{
    agent any
    environment {
        APP_NAME            = "doc"
        APP_TEST_PORT       = "35806"
        DB_TEST_PORT        = "15933"
        DB_STAGING_PORT     = "16904"
        APP_VERSION         = "1.0.0"
    }
    stages{
        stage("Packages installation"){
            steps{
                sh "yarn install"
                sh "mkdir -p tests/reports"
            }
        }

        stage("Test"){
            stages{
                stage("Create test DB"){
                    steps{
                        sh "docker-compose up -d doc_db_test"
                        sh "echo DATABASE_URL=postgres://register_db_dev_test:8385@localhost:${DB_TEST_PORT}/test > .env"
                        sh 'npx prisma db push'
                    }
                }

                stage("PM2 : run 4 instances"){
                    steps{
                        sh 'echo PROTOCOL=http > info.env'
                        sh 'echo PORT=${APP_TEST_PORT} >> info.env'
                        sh 'echo HOST=localhost >> info.env'
                        sh 'pm2 start index.js -i 4 --name pm2_Ins_doc'
                    }
                }

                stage("Frisby : test routes"){
                    steps{
                        sh 'yarn test > tests/reports/frisby.test'
                    }
                }

                stage("Artillery : test scenarios (20s)"){
                    steps{
                        sh "npx artillery run tests/scen1.yml -c tests/config.yml -o tests/reports/report-test1.json -t http://localhost:${APP_TEST_PORT}"
                        sh "npx artillery report tests/reports/report-test1.json -o tests/reports/report-test1.html"
                    }
                }
            }

            post{
                always{
                    sh 'docker-compose stop doc_db_test'
                    sh 'pm2 delete pm2_Ins_doc'
                }

                success {
                    archiveArtifacts artifacts: 'tests/reports/**.*', fingerprint: true
                }
            }
        }

        stage("Create packages"){
            steps{
                sh "cqx build"
                sh "zip -r build.zip build"
                sh "docker build -t dykoffi/${APP_NAME}:${APP_VERSION} ."
            }

            post{
                always{
                    sh "rm -rdf build"
                }
                success{
                     archiveArtifacts artifacts: 'build.zip', fingerprint: true
                }
            }
        }

        stage("Staging"){
            steps{
                sh 'echo staging'
            }
        }

        stage("Security tests"){
            steps{
                sh 'echo Deny of services'
                sh 'echo XSS'
                sh 'echo SQL injection'
            }
        }

        stage("Deployment"){
            environment{
                DOCKERHUB_CREDENTIALS       = credentials('DKHUB')
                PLANETHOSTER_SERVER         = credentials('PLH_SERVER_CRDTS')
                PLANETHOSTER_DB             = credentials('PLH_DB_CRDTS')
                PLANETHOSTER_HOST           = "node3-ca.n0c.com"
                PLANETHOSTER_PORT           = 5022
                PLANETHOSTER_DB_URL         = "mysql://${PLANETHOSTER_DB_USR}:${PLANETHOSTER_DB_PWD}@localhost:3306/${PLANETHOSTER_DB_USR}_doc"
            }

            parallel {
                stage("Deploy to planetHoster"){ 
                    steps{
                        sh "cqx deploy -s $PLANETHOSTER_SERVER_USR@$PLANETHOSTER_HOST:$PLANETHOSTER_PORT/home/$PLANETHOSTER_SERVER_USR/Api/doc \
                        -p $PLANETHOSTER_SERVER_PWD \
                        --db $PLANETHOSTER_DB \
                        -c cd /home/$PLANETHOSTER_SERVER_USR/Api \
                        -c source /home/$PLANETHOSTER_SERVER_USR/nodevenv/Api/doc/14/bin/activate \
                        -c 'npm i'"
                    }
                }
                stage("Deploy to AWS EC2"){ 
                    steps{
                        sh "echo 'cqx deploy to EC2 : skip'"
                    }
                }
                stage("Deploy to AWS ECS"){ 
                    steps{
                        sh "echo 'deploy to ECS : skip'"
                    }
                }
                stage("Deploy to AWS EKS"){ 
                    steps{
                        sh "echo 'deploy to EKS : skip'"
                    }
                }
                stage("Publish to AWS ECR"){ 
                    steps{
                        sh "echo 'publish to ECR : skip'"
                    }
                }
                stage("Publish to DockerHUB"){ 
                    steps{
                        sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                        sh "docker push dykoffi/${APP_NAME}:${APP_VERSION}"
                    }

                    post{
                        always{
                            sh "docker logout"
                        }
                    }
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}