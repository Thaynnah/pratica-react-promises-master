import { writeFile, readFile } from 'fs';
import { resolve } from 'path';

const ARQUIVO_DE_FILA = `${resolve('.')}/files/fila.txt`;

/**
 * Os métodos escritos abaixo implementam uma fila de mensagens escritas em
 * arquivo de texto, presente na pasta "files". A cada mensagem escrita nesta fila,
 * (através do método `escreveNaFila`) o código escreve a frase ao final do arquivo.
 * O método `consumirDafila` retira a primeira mensagem escrita no arquivo e a retorna.
 *
 * As funções abaixo estão todas escritas utilizando callbacks como soluções
 * para a manipulação dos arquvos.
 *
 * Tranforme a solução escrita abaixo em um código válido utilizando promises ou
 * async/await.
 */

 export async function zerarAquivo(): Promise<void> {
  await escreveArquivo("");
}

export async function leArquivo(): Promise<string> {
  return new Promise((res, rej) => {
    readFile(ARQUIVO_DE_FILA, "utf8", (err, resultado) => {
      if (err) {
        rej(err);
        return;
      }

      res(resultado);
    });
  });
}

export async function escreveArquivo(texto: string): Promise<void> {
  return new Promise((res, rej) => {
    writeFile(ARQUIVO_DE_FILA, texto, "utf8", function (err) {
      if (err) {
        rej(err);
        return;
      }
      res();
    });
  });
}

export async function escreveNaFila(texto: string): Promise<void> {
  const textoAtual = await leArquivo();
  console.log("texto encontrado anteriormente no arquivo", textoAtual);
  const novoTexto = textoAtual ? `${textoAtual}\n${texto}` : texto;

  await escreveArquivo(novoTexto);
  console.log("texto escrito no arquivo");
}

export async function consumirDaFila(): Promise<string> {
  const textoAtual = await leArquivo();
  console.log("texto encontrado anteriormente no arquivo", textoAtual);
  const [linhaConsumida, ...linhas] = textoAtual.split("\n");
  console.log("======== linha consumida \n", linhaConsumida);

  await escreveArquivo(linhas.join("\n"));
  console.log("texto escrito no arquivo");
  return linhaConsumida;
}