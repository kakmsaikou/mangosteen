import s from './welcome.module.scss'
import {FunctionalComponent} from 'vue';
import {RouterLink} from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';

export const FirstActions: FunctionalComponent = ()=>{
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} to="/items" >跳过</SkipFeatures>
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <SkipFeatures>跳过</SkipFeatures>
  </div>
}

FirstActions.displayName = 'FirstActions'