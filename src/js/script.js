$(document).ready(function(){

	$("body").on("click", ".start", function() {
		$(".screen-1").fadeOut();
		$(".screen-2").fadeIn();
		setTimeout(function() {
	       $(".msg-load").addClass("show");
	       $(".screen-2").delay(2000).fadeOut(400);
	       $(".screen-3").delay(2000).fadeIn(400);
	       $(".status-top").delay(2000).fadeIn(400);
	   }, 2000);
	});

	$("body").on("click", ".item-right", function() {
		$(".screen-hidden").toggleClass("animate-screen");
	});

	$("body").on("click", ".button", function() {
		var nivel = $(this).closest('.nivel').attr("id");
		$("#"+nivel+"").addClass("remove-msg");
		$(".meta-do-jogo").css("display", "none");
	});

	$("body").on("click", ".navigation li", function() {
		nivel = $(this).attr("data-nivel");
		$("#nivel-"+nivel+"").fadeIn();
		$("#"+nivel+"").removeClass("remove-msg");
		$(".meta-do-jogo").css("display", "block");
	});

	$('.nivel').each(function (index) {
 	   movimento_inicial = Number($("#nivel-"+index+" .movimentos").attr("data-movimentos"));
 	   meta_inicial = $("#nivel-"+index+" .meta").attr("data-meta");
 	   valor_inicial = $("#nivel-"+index+" .total").attr("data-inicial");
 	   $("#nivel-"+index+" .valor-inicial").html(valor_inicial);
 	   $("#nivel-"+index+" .valor-movimentos").html(movimento_inicial);
 	   $("#nivel-"+index+" .valor-meta").html(meta_inicial);
	});

	var nivel = $(".nivel").attr('id');

	function tempoJogo(total_segundos) {
		function trataNumeros(num) {
			return ( num < 10 ? "0" : "" ) + num;
		}

	var minutos = Math.floor(total_segundos / 60);
	total_segundos = total_segundos % 60;

	var segundos = Math.floor(total_segundos);

	minutos = trataNumeros(minutos);
	segundos = trataNumeros(segundos);

	var tempo_atual = minutos + ":" + segundos;

	return tempo_atual;
	}

	function start_time(nivel){
		var segundos_decorrentes = 0;
		timer = setInterval(function() {
			segundos_decorrentes = segundos_decorrentes + 1;
			var time = $("#"+nivel+"").find("time").html(tempoJogo(segundos_decorrentes));
		}, 1000);
	}

	function stop_time(nivel) {
		clearInterval(timer);
	}

	function clear_time(nivel) {
		$("#"+nivel+" time").html("00:00");
	}

    $("body").on("click", ".item-left", function() {
		var nivel = $('.nivel').attr("id");
		$(".nivel").css("display", "none");
		$(".nivel").removeClass("remove-msg");
		$("#"+nivel+" .total span").html(valor_inicial);
		$("#"+nivel+" .movimentos span").html(movimento_inicial);
		stop_time(nivel);
		clear_time(nivel);
	});

	var click = 0;

	$('body').on('click', ".calc li span", function(){
		var nivel = $(this).closest('.nivel').attr("id");
        var operador = $(this).attr("data-operador");
        var valor = Number($(this).find("i").html());
        var inicia = Number($("#"+nivel+" .total span").html());
        var valor_inicial = Number($("#"+nivel+" .total").attr("data-inicial"));
		var meta_inicial = $("#"+nivel+" .meta").attr("data-meta");
        var movimento_inicial = Number($("#"+nivel+" .movimentos").attr("data-movimentos"));
        var movimentos = Number($("#"+nivel+" .valor-movimentos").html());
        click++;
        switch(operador) {
            case "soma":
                inicia = inicia+valor;
            break;
            case "multiplicacao":
                inicia = inicia*valor;
            break;
            case "subtracao":
                inicia = inicia-valor;
            break;
            case "divisao":
                inicia = inicia/valor;
            break;
        }

        var resultado = Number($("#"+nivel+" .total span").html(inicia));
        var resultado = eval(inicia);
        novomovimento = movimentos-1;

        $("#"+nivel+" .valor-movimentos").html(novomovimento);

        if (meta_inicial == resultado) {
			$("#"+nivel+" .mensagem-1 .status-win-or-loose").html("Acertou");
			$("#"+nivel+" .mensagem-1").addClass("exibe");
			$("#"+nivel+" .mensagem-1").addClass("acertou");
			$("#"+nivel+" .status-msg").addClass("icon-win");
			$("#"+nivel+" .status-msg").html("Que jogada incrível");
			setTimeout(function() {
		       $("#"+nivel+" .mensagem-1").removeClass("exibe");
		       $("#"+nivel+" .mensagem-2").addClass("exibe");
		       $("#"+nivel+" .mensagem-2").addClass("acertou");
		       $("#"+nivel+" .mensagem-2").removeClass("errou");
		    }, 1000);
		    time = $("#"+nivel+" time").html();
			$("#"+nivel+" .time i").html(time);
			stop_time();
			if (time <= "01:00") {
				$("#"+nivel+" .stars li").addClass("win");
			}
			if (time >= "01:01" && time <= "02:00") {
				$("#"+nivel+" .stars li:nth-of-type(1)").addClass("win");
				$("#"+nivel+" .stars li:nth-of-type(2)").addClass("win");
			}
			if (time >= "02:01") {
				$("#"+nivel+" .stars li:nth-of-type(1)").addClass("win");
			}
			$("#"+nivel+"").next().addClass("desbloqueado");

		} else if (resultado != meta_inicial && novomovimento === 0)	{
			$("#"+nivel+" .mensagem-1 .status-win-or-loose").html("Errou");
			$("#"+nivel+" .mensagem-1").addClass("exibe");
			$("#"+nivel+" .mensagem-1").addClass("errou");
			$("#"+nivel+" .mensagem-2").addClass("errou");
			$("#"+nivel+" .mensagem-2").removeClass("acertou");
			$("#"+nivel+" .stars li").removeClass("win");
			setTimeout(function() {
		       $("#"+nivel+" .mensagem-1").removeClass("exibe");
		       $("#"+nivel+" .mensagem-1").removeClass("errou");
		       $("#"+nivel+" .mensagem-2").addClass("exibe");
		    }, 1000);
		    time = $("#"+nivel+" time").html();
			$("#"+nivel+" .time i").html(time);
			stop_time();
			$("#"+nivel+" .status-msg").html("Não foi desta vez!");
			$("#"+nivel+" .status-msg").removeClass("icon-win");
			$("#"+nivel+" .status-msg").addClass("icon-loose");
			$(".vidas li:first-child").remove();
		}

		if (novomovimento === 0) {
			$("#"+nivel+" .calc li span").addClass("disabled");
		}

    });

    $('body').on('click', ".close", function(){
    	$(".nivel").css("display", "none");
    });

    $('body').on('click', ".proximo-nivel", function(){
    	var nivel = $(this).closest('.nivel').attr("id");
    	$("#"+nivel+"").fadeOut();
    	$(".meta-do-jogo").css("display", "block");
    	var proximo = $("#"+nivel+"").siblings();
    	console.log(proximo);
    	$("#"+nivel+"").next().fadeIn().trigger("click");
    });

    $('body').on('click', ".calc li.start-time, .start-nivel", function(){
    	var nivel = $(this).closest('.nivel').attr("id");
		$("#"+nivel+"").find(".calc li").removeClass("start-time");
		start_time(nivel);
	});

	$('body').on('click', ".jogar-novamente, .proximo-nivel", function(){
		var nivel = $(this).closest('.nivel').attr("id");
		$("#"+nivel+"").find(".time-start").removeClass("start-time");
		stop_time(nivel);
		start_time(nivel);
		$("#"+nivel+" .mensagem-2").removeClass("exibe");
		clear_time();
		$("#"+nivel+" .calc li span").removeClass("disabled");
		$("#"+nivel+" .total span").html(valor_inicial);
		$("#"+nivel+" .movimentos span").html(movimento_inicial);
	});

    $('body').on('click', ".clear", function(){
    	nivel = $(this).closest('.nivel').attr("id");
    	valor_inicial = Number($("#"+nivel+" .total").attr("data-inicial"));
    	$("#"+nivel+" .movimentos span").html(movimento_inicial);
    	$("#"+nivel+" .total span").html(valor_inicial);
    	$("#"+nivel+" .mensagem-1 .status").html("");
    	$("#"+nivel+" .calc li span").removeClass("disabled");
    	$("#"+nivel+" .mensagem-1").removeClass("exibe");
    	$("#"+nivel+" .mensagem-1").removeClass("acertou");
    	$("#"+nivel+" .mensagem-2").removeClass("exibe");
		$("#"+nivel+" .time-start").addClass("start-time");
		stop_time(nivel);
		clear_time(nivel);
    });





});