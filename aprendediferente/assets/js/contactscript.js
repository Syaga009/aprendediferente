"use strict";
var quiz = {
    user: " ",
    questions: [
        {
            text: "El hábito del cierre de venta es:",
            responses: [
                { text: "Tomar decisiones", correct: true },
                { text: "Jugar a ganar" },
                { text: "Enfoque" }
            ]
        },
        {
            text: "La fórmula del cierre de venta se compone de:",
            responses: [
                { text: "Enfoque + emoción + Acción", correct: true },
                { text: "Enfoque + decisión + Acción" },
                { text: "Enfoque+ adrenalina + decisión "}
            ]
        },
        {
            text: "Cuando escucho un no de parte de mi cliente es el momento para transformar su “NO” en un “si” cuando estoy enfocado en la venta en estado de seguridad:",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "falso" }
            ]
        },
        {
            text: "Cuando escuche un NO tajante puedo preguntar:",
            responses: [
                { text: "Perfecto, ¿Qué desea pensar?", correct: true },
                { text: "¿Por qué no lo compra?" },
                { text: "Colgar y eliminar de base de datos al cliente" }
            ]
        },
        {
            text: "Siempre que reciba un No o una objeción por parte del cliente debo respetar este hábito y dejarlo ir:",
            responses: [
                { text: "Verdadero" },
                { text: "Falso", correct: true }
            ]
        },
        {
            text: "Si el cliente dice que debe hablarlo con su socio o con otra persona, le podemos decir:",
            responses: [
                { text: "Claro que sí, cuénteme ¿qué día lo vuelvo a llamar?", correct: true  },
                { text: "Bueno, estaremos atentos a su llamado" },
                { text: "Y si hacemos una teleconferencia con esa persona, ¿Qué pasaría?"}
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