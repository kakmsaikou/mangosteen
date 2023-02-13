import s from './welcome.module.scss';
import {FunctionalComponent} from 'vue';

export const Fourth: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref="#cloud"/>
    </svg>
    <h2>云备份<br/>再也不怕数据丢失</h2>
  </div>;
};

Fourth.displayName = 'Fourth';