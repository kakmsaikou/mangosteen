import {FunctionalComponent} from 'vue';
import {RouterLink} from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
import s from './welcome.module.scss';

export const FourthActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} to="/items">跳过</SkipFeatures>
    <SkipFeatures to="/items">完成</SkipFeatures>
    <SkipFeatures class={s.fake} to="/items">跳过</SkipFeatures>
  </div>;
};

FourthActions.displayName = 'FourthActions';