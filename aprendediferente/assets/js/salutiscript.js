"use strict";
var quiz = {
    user: " ",
    questions: [
        {
            text: "El hábito del cierre de venta es: ",
            responses: [
                { text: "Tomar decisione", correct: true },
                { text: "Jugar a ganar" },
                { text: "Enfóque" }
            ]
        },
        {
            text: "Una de las estrategias más efectivas al momento del cierre de venta es: “construir en mi mente lo que quiero que suceda, poniéndome en estado de expectativa y logrado así mis resultado”: ",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "La venta cruzada es: ",
            responses: [
                { text: "Hacer que el cliente gaste más" },
                { text: "La fórmula para ascender en Allers" },
                { text: "Ir por más", correct: true }
            ]
        },
        {
            text: "Los conectores ideales para lograr una venta cruzada pueden ser:",
            responses: [
                { text: "Este producto es el mejor del mercado o este producto es considerado unos de los mejores" },
                { text: "Este producto hace que… o este producto hará que…", correct: true },
                { text: "Yo le garantizo que… o créame que este producto…." }
            ]
        },
        {
            text: "Cuando escucho un no de parte de mi cliente es el momento para transformar su “NO” en un “si” cuando estoy enfocado en la venta en estado de seguridad:",
            responses: [
                { text: "Verdadero", correct: true },
                { text: "Falso" }
            ]
        },
        {
            text: "Cuando escuche un NO tajante puedo preguntar:",
            responses: [
                { text: "¿Qué le impide comprarlo?", correct: true  },
                { text: "¿Por qué no lo lleva?" },
                { text: "No responder es la mejor opción"}
            ]
        },
        {
            text: "Siempre que reciba un No o una objeción por parte del cliente debo respetar este hábito y dejarlo ir:",
            responses: [
                { text: "Verdadero"},
                { text: "Falso", correct: true   }
            ]
        }
        ,
        {
            text: "Si al cliente le parece muy costoso nuestro producto debo:",
            responses: [
                { text: "Debemos aplicar descuentos y que se lo lleve a como de lugar"},
                { text: "Darle al cliente la plena seguridad que la calidad del producto hará que su inversión se vea reflejada", correct: true   },
                { text: "Decirle al cliente que tiene la razón, pero que igualmente lo lleve ya que es un producto de calidad"}
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
                    score = score + 12.5;
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