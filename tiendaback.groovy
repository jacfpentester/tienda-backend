job('Job-apitienda') {
    description('Job Padre para crear una tarea Hija que despliegue la Api de la tienda')
    scm {
        git('https://github.com/jacfpentester/tienda-backend.git', 'main'){ 
            node -> 
                node / gitConfigName('jose antonio')
                node / gitConfigEmail('jacfpentester@gmail.com')
        }
    }
    triggers {
     //   scm('H/5 * * * *')
        githubPush()
    }
    
    // steps {
    //     shell("bash ./pCine/build/install.sh")
    // }
}