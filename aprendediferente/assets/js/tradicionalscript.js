"use strict";
var quiz = {
    user: " ",
    questions: [
        {
            text: "El filtro duración hace referencia como utilizamos el lenguaje para describir una situación, estrategia, producto, etc:",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "El filtro duración se compone de dos grupos:",
            responses: [
                { text: "Concreto y General" },
                { text: "Concreto y Descriptivo" },
                { text: "Concreto y Expansivo", correct: true }
            ]
        },
        {
            text: "El filtro expansivo está orientado a:",
            responses: [
                { text: "Las emociones" },
                { text: "Las sensaciones", correct: true },
                { text: "Las descripciones largas y detalladas" }
            ]
        },
        {
            text: "En el filtro dirección y grupo “hacia” los clientes suelen utilizar palabras como:",
            responses: [
                { text: "Lo que yo quiero…, lo que para mí es importante…, lo que quiero lograr es…", correct: true },
                { text: "Estoy pensando en…., no sé si me gusta…., tal vez pueda…" },
                { text: "No quiero tener…, no me gusta…, quiero evitar …" }
            ]
        },
        {
            text: "Las personas visuales son personas que su ritmo es rápido y su fisiología es erguida:",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "El lenguaje de los clientes auditivos se compone con palabras como:",
            responses: [
                { text: "Dime, hablemos, te escucho, quiero oír tu opinión", correct: true  },
                { text: "Mostrar, observar, analizar, tocar" },
                { text: "Sentir, observar, escuchar, decir"}
            ]
        },
        {
            text: "Los clientes kinestésicos",
            responses: [
                { text: "Nueva visión, forma de pensar y moverse", correct: true },
                { text: "Nueva actitud, conocimientos y moverse" },
                { text: "Pensar, sentir y comunicar" }
            ]
        },
        {
            text: "La energía se genera a partir de:",
            responses: [
                { text: "Para nosotros es muy importante que sienta nuestro respaldo, con esta oferta vamos a impactar el flujo de caja", correct: true },
                { text: "Queremos que este seguro de nuestro servicio, sabemos que la calidad lo es todo"},
                { text: "c.	Quiero comprometerme a que la empresa no fallará, estamos dispuestos a que usted sienta nuestro compromiso " }            ]
        }
    ]
}, userResponseSkelaton = Array(quiz.questions.length).fill(null);
var app = new Vue({
    el: "#app",
    data: {
        quiz: quiz,
        questionIndex: 0,
        userResponses: userResponseSkelaton,
        isActive: false
    },
    filters: {
        charIndex: function (i) {
            return String.fromCharCode(97 + i);
        }
    },
    methods: {
        restart: function () {
            const queryString = window.location.search;
            console.log(queryString);
            console.log("puntaje: "+ this.score());
            const url ="https://adntraining.000webhostapp.com/actualizarallersconcepto.php"+queryString+"&puntos="+this.score();
            console.log(url);
            var theLinks = document.querySelectorAll('.paginacion a');

            theLinks.forEach(function (element, index) {
                element.href = url;
            });
        },
        selectOption: function (index) {
            Vue.set(this.userResponses, this.questionIndex, index);
            //console.log(this.userResponses);
        },
        next: function () {
            if (this.questionIndex < this.quiz.questions.length)
                this.questionIndex++;
        },
        prev: function () {
            if (this.quiz.questions.length > 0)
                this.questionIndex--;
        },
        // Return "true" count in userResponses
        score: function () {
            var score = 0;
            for (let i = 0; i < this.userResponses.length; i++) {
                if (typeof this.quiz.questions[i].responses[this.userResponses[i]] !== "undefined" &&
                    this.quiz.questions[i].responses[this.userResponses[i]].correct) {
                    score = score + 14.3;
                    if(score>=100)
                    {
                        score = 100;
                    }
                    
                }
            }

            return score;
            //return this.userResponses.filter(function(val) { return val }).length;
        }
    }
});