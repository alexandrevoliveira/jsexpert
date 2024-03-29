'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

// watch(__filename, async(event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File()
// dessa forma ele ignora o 'this' da classe File
// herda o this do watch
// watch(__filename, file.watch)

// alternativa para não herdar o this da função
// mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explícito qual é o contexto que a função deve seguir
// o bind retorna uma função com o 'this' de 'file',
// o qual foi passado como parâmetro do 'bind'. Portanto irá ignorar o 'this'
// da função 'watch
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename])
