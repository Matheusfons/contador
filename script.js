const html = document.querySelector('html')

// mudança de telas
const foco_bt = document.querySelector('.app__card-button--foco')

const curto_bt = document.querySelector('.app__card-button--curto')

const longo_bt = document.querySelector('.app__card-button--longo')

//imagens e texto nas trocas de telas

const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title')

const botoes = document.querySelectorAll('.app__card-button')

//musica quando se seleciona musica no html
const musica_foco_input = document.querySelector('#alternar-musica')

const musica = new Audio('/sons/luna-rise-part-one.mp3')


//botão do temporizador
const start_pause_bt = document.querySelector('#start-pause')

//audios de inio e fim do tempórizador 
const audio_fim_contador = new Audio('/sons/beep.mp3')

const audio_pause = new Audio('/sons/pause.mp3')

const audio_play = new Audio('/sons/play.wav')

const bt_inicar_ou_pausar_bt = document.querySelector('#start-pause span')

// temporizador mudança botão start e pause 

const bt_temporizador_start = document.querySelector('.app__card-primary-butto-icon')


const tempo_na_tela = document.querySelector('#timer')
// variaveis
let tempo_em_segundos = 1500  // contador de tempo

let intervalo_id=null

musica.loop = true // garante musica  sons/luna-rise-part-one.mp3 em loop infinito


musica_foco_input.addEventListener('change',() => { // garante através da mudança no evento musica_foco_input tocar as musicas

    if(musica.paused){
        musica.play()
        
    }
    else{
        musica.pause()
        
        
    }
    
})

foco_bt.addEventListener('click', () =>{
    tempo_em_segundos=1500
    alterar_contexto('foco')  // manda a informação para função alterar_contexto , dentro vai a variavel que é o contexto
    foco_bt.classList.add('active') // adiciona condição ativo ao botão 
})

curto_bt.addEventListener('click', () =>{
    tempo_em_segundos=300
    alterar_contexto('descanso-curto') // manda a informação para função alterar_contexto , dentro vai a variavel que é o contexto
    curto_bt.classList.add('active') // adiciona condição ativo ao botão 
})

longo_bt.addEventListener('click', () =>{
    tempo_em_segundos=900
    alterar_contexto('descanso-longo') // manda a informação para função alterar_contexto , dentro vai a variavel que é o contexto
    longo_bt.classList.add('active') // adiciona condição ativo ao botão 
})

// controle de telas
function alterar_contexto(contexto) {
    // altera cotador
    mostrar_tempo()
    //remove os ativos dos outros botões
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)    // seta na variavel contexto o atributo pedido
    banner.setAttribute('src',`/imagens/${contexto}.png`) // muda a imagem segundo contexto
    
    // recebe contexto para mudança de frases 
    switch (contexto) {
        case "foco":
            titulo.innerHTML =`Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case "descanso-curto":
            titulo.innerHTML =`Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            
            break;

        case "descanso-longo":
            titulo.innerHTML =`Hora de voltar à superfície.<strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}
// fim da troca de tela 

//temporizador
const contagem_regressiva = () => {

    if (tempo_em_segundos <= 0) { // se contador chegar a zero aplica a condição
        audio_fim_contador.play()
        alert('tempo finalizado')
        zerar()
        return
    }
    tempo_em_segundos -= 1 //subtrai tempo no contador
    //console.log('temporizador:' + tempo_em_segundos) // mostra contador no console
    mostrar_tempo()
}

start_pause_bt.addEventListener('click', iniciar_ou_pausar) // inicia  a função iniciar_ou_pausar a partir do click

// inicia e pausa contador 
function iniciar_ou_pausar(){
    if (intervalo_id) {
        zerar()
        bt_temporizador_start.setAttribute('src',`/imagens/play_arrow.png`)
        audio_pause.play()
        return
    }
    bt_temporizador_start.setAttribute('src',`/imagens/pause.png`)
    audio_play.play()
    intervalo_id = setInterval(contagem_regressiva, 1000) // contador a cada 1000 milisegundos
    bt_inicar_ou_pausar_bt.textContent = "pausar" // muda nome na <span> do botão
}

// zera o contador 
function zerar() {
    clearInterval(intervalo_id) //zera contador de tempo
    bt_inicar_ou_pausar_bt.textContent = "Começar" // muda nome na <span> do botão
    intervalo_id = null // torna contador vazio para reniciar e não sobreescrever um após o outro
}


function mostrar_tempo() {

    const tempo = new Date(tempo_em_segundos *1000)
    const tempo_formt = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second:'2-digit'} )
    tempo_na_tela.innerHTML = `${tempo_formt}`
    
}

mostrar_tempo()