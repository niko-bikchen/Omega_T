/**
 * Created by Andriy on 10.03.2015.
 */
module.exports = function (grunt) {
    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify: {
            //Загальні налаштування (grunt-browserify)
            options: {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform: [require('brfs')],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/js/"
                }
            },

            //Збірка з назвою піца
            main_page: {
                src: 'Frontend/src/main_page_main.js',
                dest: 'Frontend/web/assets/scripts/main_page_bundle.js'
            },

            login_page: {
                src: 'Frontend/src/login_page_main.js',
                dest: 'Frontend/web/assets/scripts/login_page_bundle.js'
            },

            about_page: {
                src: 'Frontend/src/about_page_main.js',
                dest: 'Frontend/web/assets/scripts/about_page_bundle.js'
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:main_page', 'browserify:login_page', 'browserify:about_page']
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Список завданнь по замовчування
    grunt.registerTask('default',
        [
            'browserify:main_page',
            'browserify:login_page',
            'browserify:about_page'
            //Інші завдання які необхідно виконати
        ]
    );

};