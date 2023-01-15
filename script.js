class Calculadora {
    constructor(operadorAnteriorTexto, operadorAtualTexto) {
        this.operadorAnteriorTexto = operadorAnteriorTexto
        this.operadorAtualTexto = operadorAtualTexto
        this.ac()
    }

    ac() {
        this.operadorAnterior = ''
        this.operadorAtual = ''
        this.operador = undefined
    }

    delete() {
        this.operadorAtual = this.operadorAtual.toString().slice(0, -1)
    }

    acrescentarNumero(numero) {
        if (numero === ',') {numero = '.'}
        if (numero === '.' && this.operadorAtual.includes('.')) return
        this.operadorAtual = this.operadorAtual.toString() + numero.toString()
    }

    operadorSelecionado(operador) {
        if (this.operadorAtual === '') return
        if (this.operadorAtual !== '') {
            this.calculo
        }
        this.operador = operador
        this.operadorAnterior = this.operadorAtual
        this.operadorAtual = ''
    }

    calculo() {
        let calculo
        const anterior = parseFloat(this.operadorAnterior)
        const atual = parseFloat(this.operadorAtual)
        if (isNaN(anterior) || isNaN(atual)) return
        switch (this.operador) {
            case '+':
                calculo = anterior + atual
                break
            case '-':
                calculo = anterior - atual
                break
            case '*':
                calculo = anterior * atual
                break
            case '÷':
                calculo = anterior / atual
                break
            case '%':
                calculo = (anterior * atual) / 100
                break
          default:
            return
        }
        this.operadorAtual = calculo
        this.operadorAnterior = ''
        this.operador = undefined
    }

    formatarPainel(numero) {
        const numeroString = numero.toString()
        const digitosInteiros = parseFloat(numeroString.split('.')[0])
        const digitosDecimais = numeroString.split('.')[1]
        let inteirosNoPainel
            if (isNaN(digitosInteiros)) {
                inteirosNoPainel = ''
            } else {
                inteirosNoPainel = digitosInteiros.toLocaleString('pt-br', { maximumFractionDigits: 0 })
            }
        if (digitosDecimais != null) {
          return `${inteirosNoPainel},${digitosDecimais}`
        } else {
          return inteirosNoPainel
        }
      }

    atualizarPainel() {
        this.operadorAtualTexto.innerText =
            this.formatarPainel(this.operadorAtual)
        if (this.operador != null) {
            this.operadorAnteriorTexto.innerText =
                `${this.formatarPainel(this.operadorAnterior)} ${this.operador}`
      } else {
            this.operadorAnteriorTexto.innerText = ''
      }
    }
}

const numeroButtons = document.querySelectorAll('[data-numero]')
const operadorButtons = document.querySelectorAll('[data-operador]')
const igualButton = document.querySelector('[data-igual]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const operadorAnteriorTexto = document.querySelector('[data-operador-anterior]')
const operadorAtualTexto = document.querySelector('[data-operador-atual]')
  
const calculadora = new Calculadora(operadorAnteriorTexto, operadorAtualTexto)

numeroButtons.forEach(botoes => {
    botoes.addEventListener('click', () => {
        calculadora.acrescentarNumero(botoes.innerText)
        calculadora.atualizarPainel()
    }) 
})

operadorButtons.forEach(botoes => {
    botoes.addEventListener('click', () => {
        calculadora.operadorSelecionado(botoes.innerText)
        calculadora.atualizarPainel()
    })
})

igualButton.addEventListener('click', () => {
    calculadora.calculo()
    calculadora.atualizarPainel()
})

deleteButton.addEventListener('click', () => {
    calculadora.delete()
    calculadora.atualizarPainel()
})

acButton.addEventListener('click', () => {
    calculadora.ac()
    calculadora.atualizarPainel()
})
