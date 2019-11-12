import * as API from '../main'
import { post } from '../utils/request'
import Section from '../models/Section'
import flat from '../utils/flat'
import scribing from './scribing'

export default {
  showart(resource_id) {
    return post('/s1/read/showart', { resource_id })
  },
  rstep() {
    return post('/s1/read/rstep', {
      resource_id,
      resource_type: 1,
    })
  },
  saveRstep(resource_id, rstep) {
    return post('/s1/read/srstep', {
      resource_id: resource_id,
      resource_type: 1,
      rstep: rstep,
    }).then(res => res.data)
  },
  show(resource_id) {
    return post('/s1/read/show', {
      resource_id,
      resource_type: 1,
      page: 1,
    }).then(({ posts }) => flat(posts.map(i => Section.list(i))))
  },
  probation(resource_id){
  	return post('/s1/read/probation', {
      resource_id,
      resource_type: 1,
      page: 1,
    })
  },
  vrs(resource_id){
  	return post('/s1/read/vrs', {
      resource_id,
      resource_type: 1,
      page: 1,
    })
  },
  info(resource_id) {
    //图书阅读--加载基础信息
    return post('/s1/read/info', {
      resource_id,
    })
  },
  collectstatus(resource_id){
  	return post('/s1/read/collectstatus', {
      resource_id,
       resource_type: 1,
      page: 1,
    })
  },
   collectArt(resource_id){
  	return post('/s1/read/collectArt', {
      resource_id,
       resource_type: 1,
      page: 1,
    })
  }
}
