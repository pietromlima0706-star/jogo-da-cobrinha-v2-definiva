function reiniciarJOGO () {
    basic.clearScreen()
    for (let item of cobrinha) {
        item.delete()
    }
    cobrinha = []
    cobra_x = 2
    cobra_y = 2
    // Começa indo para baixo
    direcao_x = 0
    direcao_y = 1
    cobrinha.push(game.createSprite(cobra_x, cobra_y))
    if (comida) {
        comida.delete()
    }
    comida = game.createSprite(randint(0, 4), randint(0, 4))
    basic.showString("GO")
}
// Botão A: vira para a Esquerda
input.onButtonPressed(Button.A, function () {
    if (direcao_x == 0) {
        // Se estava indo para cima ou para baixo, vira para a esquerda
        direcao_x = -1
        direcao_y = 0
    } else {
        // Se estava indo para os lados, vira para cima
        direcao_x = 0
        direcao_y = -1
    }
})
// Botão A + B: Reinicia o jogo caso tenha morrido ou queira recomeçar
input.onButtonPressed(Button.AB, function () {
    reiniciarJOGO()
})
// Botão B: vira para a Direita (ou para baixo alternando)
input.onButtonPressed(Button.B, function () {
    if (direcao_x == 0) {
        // Se estava indo para cima ou para baixo, vira para a direita
        direcao_x = 1
        direcao_y = 0
    } else {
        // Se estava indo para os lados, vira para baixo
        direcao_x = 0
        direcao_y = 1
    }
})
let removido: game.LedSprite = null
let novaCabeca: game.LedSprite = null
let comida: game.LedSprite = null
let direcao_x = 0
let cobrinha: game.LedSprite[] = []
let direcao_y = 0
let cobra_y = 0
let cobra_x = 0
cobra_x = 2
cobra_y = 2
direcao_y = 1
// Inicialização
reiniciarJOGO()
// Loop principal do jogo
basic.forever(function () {
    // Atualiza a posição da cabeça com base na direção atual
    cobra_x += direcao_x
    cobra_y += direcao_y
    // Faz a cobra atravessar as bordas da tela (opcional)
    if (cobra_x > 4) {
        cobra_x = 0
    }
    if (cobra_x < 0) {
        cobra_x = 4
    }
    if (cobra_y > 4) {
        cobra_y = 0
    }
    if (cobra_y < 0) {
        cobra_y = 4
    }
    // Adiciona a nova cabeça
    novaCabeca = game.createSprite(cobra_x, cobra_y)
    // Verifica se bateu no próprio corpo
    for (let i = 0; i <= cobrinha.length - 1; i++) {
        if (novaCabeca.isTouching(cobrinha[i])) {
            game.gameOver()
        }
    }
    cobrinha.unshift(novaCabeca)
    // Verifica se comeu a comida
    if (novaCabeca.isTouching(comida)) {
        comida.delete()
        comida = game.createSprite(randint(0, 4), randint(0, 4))
        game.addScore(1)
    } else {
        // Remove a cauda se não comeu, mantendo o tamanho
        removido = cobrinha.pop()
        removido.delete()
    }
    basic.pause(400)
})
