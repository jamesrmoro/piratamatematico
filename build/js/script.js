$(document).ready(function(){function tempoJogo(e){function i(e){return(e<10?"0":"")+e}var a=Math.floor(e/60);e%=60;var t=Math.floor(e);a=i(a),t=i(t);var l=a+":"+t;return l}function start_time(e){var i=0;timer=setInterval(function(){i+=1;$("#"+e).find("time").html(tempoJogo(i))},1e3)}function stop_time(e){clearInterval(timer)}function clear_time(e){$("#"+e+" time").html("00:00")}$("body").on("click",".start",function(){$(".screen-1").fadeOut(),$(".screen-2").fadeIn(),setTimeout(function(){$(".msg-load").addClass("show"),$(".screen-2").delay(2e3).fadeOut(400),$(".screen-3").delay(2e3).fadeIn(400),$(".status-top").delay(2e3).fadeIn(400)},2e3)}),$("body").on("click",".item-right",function(){$(".screen-hidden").toggleClass("animate-screen")}),$("body").on("click",".button",function(){var e=$(this).closest(".nivel").attr("id");$("#"+e).addClass("remove-msg"),$(".meta-do-jogo").css("display","none")}),$("html,body .screen-3").animate({scrollBottom:document.body.scrollHeight},"fast"),$("body").on("click",".navigation li.desbloqueado",function(){nivel=$(this).attr("data-nivel"),$("#nivel-"+nivel).fadeIn(),$("#"+nivel).removeClass("remove-msg"),$(".meta-do-jogo").css("display","block")});var element=document.getElementById("area");element.scrollTop=element.scrollHeight,$(".nivel").each(function(e){movimento_inicial=Number($("#nivel-"+e+" .movimentos").attr("data-movimentos")),meta_inicial=$("#nivel-"+e+" .meta").attr("data-meta"),valor_inicial=$("#nivel-"+e+" .total").attr("data-inicial"),$("#nivel-"+e+" .valor-inicial").html(valor_inicial),$("#nivel-"+e+" .valor-movimentos").html(movimento_inicial),$("#nivel-"+e+" .valor-meta").html(meta_inicial)});var nivel=$(".nivel").attr("id");$("body").on("click",".item-left",function(){var e=$(".nivel").attr("id");$(".nivel").css("display","none"),$(".nivel").removeClass("remove-msg"),$("#"+e+" .total span").html(valor_inicial),$("#"+e+" .movimentos span").html(movimento_inicial),stop_time(e),clear_time(e)});var click=0;$("body").on("click",".calc li span",function(){var nivel=$(this).closest(".nivel").attr("id"),operador=$(this).attr("data-operador"),valor=Number($(this).find("i").html()),inicia=Number($("#"+nivel+" .total span").html()),valor_inicial=Number($("#"+nivel+" .total").attr("data-inicial")),meta_inicial=$("#"+nivel+" .meta").attr("data-meta"),movimento_inicial=Number($("#"+nivel+" .movimentos").attr("data-movimentos")),movimentos=Number($("#"+nivel+" .valor-movimentos").html());switch(click++,operador){case"soma":inicia+=valor;break;case"multiplicacao":inicia*=valor;break;case"subtracao":inicia-=valor;break;case"divisao":inicia/=valor}var resultado=Number($("#"+nivel+" .total span").html(inicia)),resultado=eval(inicia);novomovimento=movimentos-1,$("#"+nivel+" .valor-movimentos").html(novomovimento),meta_inicial==resultado?($("#"+nivel+" .mensagem-1 .status-win-or-loose").html("Acertou"),$("#"+nivel+" .mensagem-1").addClass("exibe"),$("#"+nivel+" .mensagem-1").addClass("acertou"),$("#"+nivel+" .status-msg").addClass("icon-win"),$("#"+nivel+" .status-msg").html("Que jogada incrível"),$(".navigation li:last-child").addClass("desbloqueado-first"),setTimeout(function(){$("#"+nivel+" .mensagem-1").removeClass("exibe"),$("#"+nivel+" .mensagem-2").addClass("exibe"),$("#"+nivel+" .mensagem-2").addClass("acertou"),$("#"+nivel+" .mensagem-2").removeClass("errou")},1e3),time=$("#"+nivel+" time").html(),$("#"+nivel+" .time i").html(time),stop_time(),time<="01:00"&&$("#"+nivel+" .stars li").addClass("win"),time>="01:01"&&time<="02:00"&&($("#"+nivel+" .stars li:nth-of-type(1)").addClass("win"),$("#"+nivel+" .stars li:nth-of-type(2)").addClass("win")),time>="02:01"&&$("#"+nivel+" .stars li:nth-of-type(1)").addClass("win"),$("#"+nivel).next().addClass("desbloqueado"),$("#"+nivel).closest("body").find(".navigation li.desbloqueado").prev().addClass("desbloqueado")):resultado!=meta_inicial&&0===novomovimento&&($("#"+nivel+" .mensagem-1 .status-win-or-loose").html("Errou"),$("#"+nivel+" .mensagem-1").addClass("exibe"),$("#"+nivel+" .mensagem-1").addClass("errou"),$("#"+nivel+" .mensagem-2").addClass("errou"),$("#"+nivel+" .mensagem-2").removeClass("acertou"),$("#"+nivel+" .stars li").removeClass("win"),setTimeout(function(){$("#"+nivel+" .mensagem-1").removeClass("exibe"),$("#"+nivel+" .mensagem-1").removeClass("errou"),$("#"+nivel+" .mensagem-2").addClass("exibe")},1e3),time=$("#"+nivel+" time").html(),$("#"+nivel+" .time i").html(time),stop_time(),$("#"+nivel+" .status-msg").html("Não foi desta vez!"),$("#"+nivel+" .status-msg").removeClass("icon-win"),$("#"+nivel+" .status-msg").addClass("icon-loose"),$(".vidas li:first-child").remove()),0===novomovimento&&$("#"+nivel+" .calc li span").addClass("disabled")}),$("body").on("click",".close",function(){$(".nivel").css("display","none")}),$("body").on("click",".proximo-nivel",function(){var e=$(this).closest(".nivel").attr("id");$("#"+e).fadeOut(),$(".meta-do-jogo").css("display","block");var i=$("#"+e).siblings();console.log(i),$("#"+e).next().fadeIn().trigger("click")}),$("body").on("click",".calc li.start-time, .start-nivel",function(){var e=$(this).closest(".nivel").attr("id");$("#"+e).find(".calc li").removeClass("start-time"),start_time(e)}),$("body").on("click",".jogar-novamente, .proximo-nivel",function(){var e=$(this).closest(".nivel").attr("id");$("#"+e).find(".time-start").removeClass("start-time"),stop_time(e),start_time(e),$("#"+e+" .mensagem-2").removeClass("exibe"),clear_time(),$("#"+e+" .calc li span").removeClass("disabled"),$("#"+e+" .total span").html(valor_inicial),$("#"+e+" .movimentos span").html(movimento_inicial)}),$("body").on("click",".clear",function(){nivel=$(this).closest(".nivel").attr("id"),valor_inicial=Number($("#"+nivel+" .total").attr("data-inicial")),$("#"+nivel+" .movimentos span").html(movimento_inicial),$("#"+nivel+" .total span").html(valor_inicial),$("#"+nivel+" .mensagem-1 .status").html(""),$("#"+nivel+" .calc li span").removeClass("disabled"),$("#"+nivel+" .mensagem-1").removeClass("exibe"),$("#"+nivel+" .mensagem-1").removeClass("acertou"),$("#"+nivel+" .mensagem-2").removeClass("exibe"),$("#"+nivel+" .time-start").addClass("start-time"),stop_time(nivel),clear_time(nivel)})});