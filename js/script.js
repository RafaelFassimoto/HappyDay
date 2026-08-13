/* =========================================================
   FADELITO HAPPY DAY
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. ROLAGEM SUAVE
    ===================================================== */

    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = this.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       02. MÁSCARA DE WHATSAPP
    ===================================================== */

    const campoWhatsApp = document.getElementById("whatsapp");

    if (campoWhatsApp) {

        campoWhatsApp.addEventListener("input", function () {

            let valor = this.value.replace(/\D/g, "");

            if (valor.length > 11) {
                valor = valor.substring(0, 11);
            }

            if (valor.length <= 10) {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

            } else {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

            }

            this.value = valor;

        });

    }


    /* =====================================================
       03. FORMULÁRIO
    ===================================================== */

    const formulario = document.getElementById("happy-day-form");

    if (formulario) {

        formulario.addEventListener("submit", function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               CAMPOS
            --------------------------------------------- */

            const responsavel = document
                .getElementById("responsavel")
                .value
                .trim();

            const whatsapp = document
                .getElementById("whatsapp")
                .value
                .trim();

            const email = document
                .getElementById("email")
                .value
                .trim();

            const crianca = document
                .getElementById("crianca")
                .value
                .trim();

            const idade = document
                .getElementById("idade")
                .value;

            const unidade = document
                .getElementById("unidade")
                .value;

            const data = document
                .getElementById("data")
                .value;

            const consentimento = document
                .querySelector('input[name="consentimento"]')
                .checked;


            /* ---------------------------------------------
               VALIDAÇÃO
            --------------------------------------------- */

            if (
                !responsavel ||
                !whatsapp ||
                !email ||
                !crianca ||
                !idade ||
                !unidade ||
                !data
            ) {

                mostrarMensagem(
                    "Por favor, preencha todos os campos.",
                    "erro"
                );

                return;
            }


            if (!consentimento) {

                mostrarMensagem(
                    "É necessário aceitar o consentimento para continuar.",
                    "erro"
                );

                return;
            }


            /* ---------------------------------------------
               VALIDAÇÃO DO E-MAIL
            --------------------------------------------- */

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValido.test(email)) {

                mostrarMensagem(
                    "Digite um e-mail válido.",
                    "erro"
                );

                return;
            }


            /* ---------------------------------------------
               VALIDAÇÃO DO WHATSAPP
            --------------------------------------------- */

            const numeroWhatsApp =
                whatsapp.replace(/\D/g, "");

            if (numeroWhatsApp.length < 10) {

                mostrarMensagem(
                    "Digite um número de WhatsApp válido.",
                    "erro"
                );

                return;
            }


            /* ---------------------------------------------
               BOTÃO
            --------------------------------------------- */

            const botao =
                formulario.querySelector('button[type="submit"]');

            const textoOriginal =
                botao.textContent;

            botao.disabled = true;

            botao.textContent = "ENVIANDO...";


            /* ---------------------------------------------
               SIMULAÇÃO DE ENVIO
               
               IMPORTANTE:
               Aqui futuramente podemos conectar o formulário
               ao CRM, API, WordPress, RD Station, etc.
            --------------------------------------------- */

            setTimeout(function () {

                botao.disabled = false;

                botao.textContent = textoOriginal;

                mostrarMensagem(
                    "Inscrição realizada com sucesso! Em breve nossa equipe entrará em contato.",
                    "sucesso"
                );

                formulario.reset();

            }, 1200);

        });

    }


    /* =====================================================
       04. MENSAGEM DO FORMULÁRIO
    ===================================================== */

    function mostrarMensagem(texto, tipo) {

        const mensagemExistente =
            document.querySelector(".form-message");

        if (mensagemExistente) {
            mensagemExistente.remove();
        }


        const mensagem =
            document.createElement("div");

        mensagem.className =
            "form-message form-message-" + tipo;

        mensagem.textContent = texto;


        formulario.prepend(mensagem);


        /* ---------------------------------------------
           ESTILO DA MENSAGEM
        --------------------------------------------- */

        mensagem.style.padding = "14px 16px";
        mensagem.style.marginBottom = "5px";
        mensagem.style.fontSize = "12px";
        mensagem.style.fontWeight = "600";
        mensagem.style.lineHeight = "1.5";


        if (tipo === "erro") {

            mensagem.style.backgroundColor = "#fff0f0";
            mensagem.style.color = "#b42318";
            mensagem.style.borderLeft = "4px solid #b42318";

        }


        if (tipo === "sucesso") {

            mensagem.style.backgroundColor = "#eef8ef";
            mensagem.style.color = "#247238";
            mensagem.style.borderLeft = "4px solid #247238";

        }


        mensagem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /* ---------------------------------------------
           REMOVE AUTOMATICAMENTE
        --------------------------------------------- */

        setTimeout(function () {

            if (mensagem) {
                mensagem.remove();
            }

        }, 6000);

    }


    /* =====================================================
       05. ANIMAÇÕES AO ENTRAR NA TELA
    ===================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".experience-card, " +
        ".differential-card, " +
        ".step, " +
        ".intro-content, " +
        ".intro-image, " +
        ".emotional-content, " +
        ".emotional-image"
    );


    /* Estado inicial */

    elementosAnimados.forEach(function (elemento) {

        elemento.style.opacity = "0";

        elemento.style.transform =
            "translateY(25px)";

        elemento.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    /* Observer */

    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach(function (elemento) {

        observer.observe(elemento);

    });


    /* =====================================================
       06. HEADER AO ROLAR
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 80) {

                header.style.position = "fixed";

                header.style.background =
                    "rgba(18, 59, 120, 0.97)";

                header.style.padding =
                    "15px 0";

                header.style.boxShadow =
                    "0 5px 25px rgba(0, 0, 0, 0.10)";

            } else {

                header.style.position = "absolute";

                header.style.background =
                    "transparent";

                header.style.padding =
                    "25px 0";

                header.style.boxShadow =
                    "none";

            }

        });

    }


    /* =====================================================
       07. ATUALIZAÇÃO AUTOMÁTICA DO ANO
    ===================================================== */

    const anoAtual =
        document.querySelector(".footer-bottom p");

    if (anoAtual) {

        const ano =
            new Date().getFullYear();

        anoAtual.textContent =
            "© " +
            ano +
            " Fadelito. Todos os direitos reservados.";

    }


});