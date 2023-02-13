import s from './welcome.module.scss';
import icon from '../../assets/icons/piggy.svg';
import {FunctionalComponent} from 'vue';

export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={icon} alt=""/>
    <h2>会挣钱<br/>还会省钱</h2>
  </div>;
};

First.displayName = 'First';