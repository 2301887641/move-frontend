<template>
    <div>
      <ul class="nav">
        <li class="nav-li" v-for="menu in menus" ref="getli"  @click.stop.prevent="toggleMenu(menu)"><span class="nav-li-span"><i class="fa" :class="menu.icon" aria-hidden="true">&nbsp;&nbsp;{{menu.text}}</i><span class="icon-double-down"><i class="fa fa-angle-double-down" aria-hidden="true"></i></span></span>
          <ul class="nav-son-ul"    v-show="menu.class" @click.stop>
            <li class="nav-son-ul-li"  v-for="childMenu in menu.children"><router-link :to="childMenu.role"><span class="nav-son-span" @click="childClick"><i class="fa" :class="childMenu.icon" aria-hidden="true">&nbsp;&nbsp;{{childMenu.text}}</i></span></router-link></li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    methods: {
      // 点击二级菜单后显示背景
      childClick($event) {
        let backColors = document.getElementsByClassName('nav-li-span-backColor')
        if (backColors.length > 0) {
          for (let i = 0; i < backColors.length; i++) {
            backColors[i].className = 'nav-son-span'
          }
        }
        let oldClassName = $event.currentTarget.className
        $event.currentTarget.className = oldClassName + ' nav-li-span-backColor'
      },
      // 切换菜单
      toggleMenu(menu) {
        let tempClass = menu.class
        this.menus.forEach(item => {
          item.class = ''
        })
        // 当菜单有href属性时，代表其将进行路由跳转而不是展开收起子菜单
        // 此时将其余菜单收起
        if (menu.parent_id > 0) {
          this.$router.push(menu.role)
          this.menus.forEach(item => {
            item.class = ''
          })
          menu.class = 'active'
          return
        }
        // 其他时候默认进行子菜单的切换
        menu.class = (tempClass === 'active') ? '' : 'active'
      }
    },
    props: {
      menus: {
        type: Array
      }
    }
  }
</script>
