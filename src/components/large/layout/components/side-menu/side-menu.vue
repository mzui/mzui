<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <!--Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <MenuItem v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <common-icon :type="item.children[0].icon || ''" />
            <span>{{ showTitle(item.children[0]) }}</span>
          </MenuItem>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <MenuItem v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <common-icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </MenuItem>
        </template>
      </template>
    </Menu-->
    <Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <MenuItem v-if="!item.children || item.children.length <= 1" :name="`${item.name}`" :key="`menu-${item.name}`" replace>
          <common-icon :type="item.icon || (item.children || [''])[0].icon" />
          <span>{{ showTitle(item) }}</span>
        </MenuItem>
        <Submenu v-else :key="`menu-${item.name}`" :name="`${item.name}`">
          <template slot="title">
            <common-icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </template>
          <template v-for="sitem in item.children">
            <MenuItem v-if="!sitem.children || sitem.children.length <= 1" :name="`${item.name}-${sitem.name}`" :key="`${item.name}-${sitem.name}`">
              <common-icon :type="sitem.icon || (sitem.children || [''])[0].icon" />
              <span>{{ showTitle(sitem) }}</span>
            </MenuItem>
            <Submenu v-else :key="`${item.name}-${sitem.name}`" :name="`${item.name}-${sitem.name}`">
              <template slot="title">
                <common-icon :type="sitem.icon || ''" />
                <span>{{ showTitle(sitem) }}</span>
              </template>
              <template v-for="s2item in sitem.children">
                <MenuItem :name="`${item.name}-${sitem.name}-${s2item.name}`" :key="`${item.name}-${sitem.name}-${s2item.name}`">
                  <common-icon :type="s2item.icon || ''" />
                  <span>{{ showTitle(s2item) }}</span>
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Submenu>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          hide-title
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        ></collapsed-menu>
        <Tooltip
          transfer
          v-else
          :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
          placement="right"
          :key="`drop-menu-${item.name}`"
        >
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{ textAlign: 'center' }">
            <common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)" />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue';
import CollapsedMenu from './collapsed-menu.vue';
import { getUnion } from '@coms/large/libs/tools';
import mixin from './mixin';

export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu,
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    rootIconSize: {
      type: Number,
      default: 20,
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: '',
    },
    openNames: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openedNames: [],
    };
  },

  methods: {
    showName(item) {},
    handleSelect(name) {
      let path = '/' + name.replace(/-/g, '/');
      console.log('select ', name, path);
      //this.$emit('on-select', name);
      this.$router.push({
        path,
        //params,
        //query,
      });
      event.preventDefault();
      event.stopPropagation();
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map((item) => item.name).filter((item) => item !== name);
    },
    updateOpenName(name) {
      if (name === this.$config.homeName) this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    },
  },
  computed: {
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
  watch: {
    activeName(name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name);
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    },
  },
  mounted() {
    console.log('=====menuList', this.menuList);
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
  },
};
</script>
<style lang="less">
@import './side-menu.less';
</style>
