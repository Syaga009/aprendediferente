"use strict";
var quiz = {
    user: " ",
    questions: [
        {
            text: "El principio básico de la empatía es: ",
            responses: [
                { text: "Confiamos en aquellos que se nos parecen", correct: true },
                { text: "Somos más agradables con las personas que nos simpatizan" },
                { text: "Ser más amigable con cualquier persona que debamos atender sin importar su actitud" }
            ]
        },
        {
            text: "Acompasar es seguir el mismo sistema de lenguaje preferencial del cliente: ",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "Cuando ya he comprobado que el cliente me sigue entro a: ",
            responses: [
                { text: "Crear empatía" },
                { text: "Juego a ganar" },
                { text: "Liderar a mi cliente", correct: true }
            ]
        },
        {
            text: "Los clientes los podemos clasificar con diferentes tipos de lenguaje, estos grupos son:",
            responses: [
                { text: "Visual, analítico, distraído" },
                { text: "Visual, auditivo y Kinestésico", correct: true },
                { text: "Visual, kinestésico y analítico" }
            ]
        },
        {
            text: "El lenguaje preferencial de un cliente auditivo puede ser: decir, mencionar, te escucho, me llama la atención, dime, te cuento, etc.",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "Los clientes kinestésicos utilizan palabras como__________ y su tono y ritmo es________:",
            responses: [
                { text: "Sentir, probar, alcanzar, sólido, impacto, respaldo, su tono y ritmo es relajado", correct: true  },
                { text: "Conocer, visualizar, escuchar, impacto, respaldo, su tono y ritmo es rápido" },
                { text: "Sentir, aprovechar, escuchar, tocar, mover, analizar, su tono y ritmo es relajado"}
            ]
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
                    score = score + 16.7;
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