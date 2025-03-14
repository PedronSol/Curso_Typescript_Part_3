import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao";

export abstract class View<T> {
  protected elemento: HTMLElement;
  private escapar = false;

  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
    }
    if (escapar) {
      this.escapar = escapar;
    }
  }

  @logarTempoDeExecucao()
  public update(model: T): void {
    // //Responsável por contar o tempo de renderização em milissegundos
    // const t1 = performance.now();

    let template = this.template(model);
    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    this.elemento.innerHTML = template;

    // const t2 = performance.now();
    // console.log(
    //   `Tempo de execução do método update ${(t2 - t1) / 1000} segundos`
    // ); Removido para dar lugar a um novo método de teste de performance de forma não intrusiva
  }

  protected abstract template(model: T): string;
}
