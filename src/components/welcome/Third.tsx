import s from './welcome.module.scss';
import icon from '../../assets/icons/chart.svg';
import {FunctionalComponent} from 'vue';

export const Third: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={icon} alt=""/>
    <h2>数据可视化<br/>收支一目了然</h2>
  </div>;
};

Third.displayName = 'Third';