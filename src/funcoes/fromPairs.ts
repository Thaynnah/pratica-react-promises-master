import { KeyAndValue } from "../../types/keyAndValue";

/**
 * Deve criar um objeto a partir da lista de arrays chave/valor
 * 
 * Ex.: fromPairs(['a', 'a'], ['b': 1], ['c': false]) === { a: 'a', b: 1, c: false }
 * 
 * @param args 
 * @returns 
 */
export const fromPairs = (args: KeyAndValue[]): Record<string, unknown> => {
  const teste: Record<string, unknown> = {};
  const retorno = args.reduce((previous, next) => {
    previous[next[0]] = next[1];
    return previous;
  }, teste);
  return retorno;
};