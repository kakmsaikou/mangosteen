import {FunctionalComponent} from 'vue';
import {RouterLink} from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
import s from './welcome.module.scss'

export const SecondActions: FunctionalComponent = ()=>{
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} to="/items">跳过</SkipFeatures>
    <RouterLink to="/welcome/3">下一页</RouterLink>
    <SkipFeatures to="/items">跳过</SkipFeatures>
  </div>
}

SecondActions.displayName = 'SecondActions'