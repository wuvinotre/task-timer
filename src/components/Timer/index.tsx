import { useEffect, useState } from 'react';
import { TempoParaSegundos } from '../../common/utils/time';
import { ITarefa } from '../../types/tarefas';
import Botton from '../Botton';
import Clock from './Clock';
import style from './timer.module.scss';

interface Props {
  selecionado: ITarefa | undefined;
  finalizarTarefa: () => void;
}

export function Timer({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(TempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      }
      finalizarTarefa();
    }, 1000);
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Clock tempo={tempo} />
      </div>
      <Botton onClick={() => regressiva(tempo)}>Começar</Botton>
    </div>
  );
}
