import {FunctionalComponent} from 'vue';
import {RouterLink} from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
import s from './welcome.module.scss';

export const ThirdAction: FunctionalComponent = ()=>{
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} to="/start">跳过</SkipFeatures>
    <RouterLink to="/welcome/4">下一页</RouterLink>
    <SkipFeatures to="/start">跳过</SkipFeatures>
  </div>
}

ThirdAction.displayName = 'ThirdActions'