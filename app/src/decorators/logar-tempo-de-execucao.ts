//Decorator que serve para fazer teste de performance
export function logarTempoDeExecucao() {
  return function (
    target: any,
    propertyKey: string,

    //Responsável por sobrescrever o método original
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      const t1 = performance.now();

      const retorno = metodoOriginal.apply(this, args);

      const t2 = performance.now();

      console.log(
        `${propertyKey}, tempo de execução: ${(t2 - t1) / 1000} segundos`
      );
      retorno;
    };

    return descriptor;
  };
}
