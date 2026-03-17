config = [
    "qa": [
        "memoryRequest": "50Mi",
        "memoryLimit": "50Mi",
        "cpuRequest": "50m",
        "cpuLimit": "1",
        "mode": "qa",
    ],
    "prod": [
        "memoryRequest": "100Mi",
        "memoryLimit": "100Mi",
        "cpuRequest": "100m",
        "cpuLimit": "1",
        "mode": "prod",
    ],
    "port": "80",
    "msName": "norte4j-web"
]

pipeline {
    agent any

    parameters {
        choice(name: 'env', choices: ['prod'], description: 'Environment')
        gitParameter(name: 'BRANCH_TAG', type: 'PT_BRANCH_TAG', description: 'branch/tag to build', sortMode: 'DESCENDING_SMART', quickFilterEnabled: true, branchFilter: 'origin/feat/configure-project-to-open-source')
    }

    environment {
        AWS_REGION = "${params.region}"
        SERVICE_NAME = getConfig(params.env, "msName")
        IMAGE_VERSION = "${params.BRANCH_TAG.startsWith("origin/") ? "v0.0.${env.BUILD_NUMBER}-${params.env}-${params.region}-SNAPSHOT".replace(/\//, "") : "v${params.BRANCH_TAG}"}"
        MIN_REPLICA = getConfig(params.env, "minReplica")
        MAX_REPLICA = getConfig(params.env, "maxReplica")
        CPU_REQUEST = getConfig(params.env, "cpuRequest")
        CPU_LIMIT = getConfig(params.env, "cpuLimit")
        CPU_HPA = "80"
        MEMORY_REQUEST = getConfig(params.env, "memoryRequest")
        MEMORY_LIMIT = getConfig(params.env, "memoryLimit")
        MEMORY_HPA = "80"

        // Application Envs
        PORT                        = getConfig(params.env, 'port')
        MODE                        = getConfig(params.env, 'mode')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: "${params.BRANCH_TAG}"]], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default', submoduleCfg: []])
            }
        }

        stage('Build in QA') {
            when { equals expected: 'qa', actual: params.env }
            steps {
                sh 'echo qa'
            }
        }

        stage('Build in Prod') {
            when { equals expected: 'prod', actual: params.env }
            steps {
                echo 'prod'
//                 script {
//                     if (params.BRANCH_TAG.startsWith("origin/")) {
//                         throw new Exception('You should build a tag instead a branch')
//                     }
//                 }
            }
        }

        stage('Build') {
            steps {
                ansiColor('xterm') {
                    nvm('v22.21.1') {
                        sh 'scripts/build.sh'
                    }
                 }
            }
        }

        stage('Build and register docker image') {
            steps {
                sh "scripts/docker-build-push.sh"
            }
        }

//         stage('Check if image exists') {
//             when { equals expected: 'prod', actual: params.env }
//             steps {
//                 sh "scripts/check-image.sh"
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 sh "cd k8s; ./deploy-k8s.sh"
//                 cleanWs()
//             }
//         }

    }

    post {
        success {
            discordSend description: "${env.JOB_NAME} Pipeline Build ${params.env} - ${IMAGE_VERSION} - ${env.BUILD_NUMBER} Success ", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${DISCORD_NOTIFIER_WEBHOOK}"
        }
        failure {
            discordSend description: "${env.JOB_NAME} Pipeline Build ${params.env} - ${IMAGE_VERSION} - ${env.BUILD_NUMBER} FAILED ", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${DISCORD_NOTIFIER_WEBHOOK}"
        }
    }
}

def getConfig(environment, key) {
    if (config[environment][key]) {
        return config[environment][key]
    }
    if (config[key]) {
        return config[key]
    }
    return
}