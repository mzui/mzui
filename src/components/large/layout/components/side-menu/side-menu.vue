<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
      @on-open-change="setOpendNames"
    >
      <template v-for="item in menuList">
        <MenuItem v-if="!item.children || item.children.length <= 1" :name="item.path" :to="item2path(item)" replace>
          <common-icon :type="item.icon || (item.children || [''])[0].icon" />
          <span :href="item2path(item)">{{ showTitle(item) }}</span>
        </MenuItem>
        <Submenu v-else :name="`${item.path}`">
          <template slot="title">
            <common-icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </template>
          <template v-for="sitem in item.children">
            <MenuItem v-if="!sitem.children || sitem.children.length <= 1" :name="sitem.path" :to="item2path(item, sitem)">
              <common-icon :type="sitem.icon || (sitem.children || [''])[0].icon" />
              <span>{{ showTitle(sitem) }}</span>
            </MenuItem>
            <Submenu v-else :name="sitem.path">
              <template slot="title">
                <common-icon :type="sitem.icon || ''" />
                <span>{{ showTitle(sitem) }}</span>
              </template>
              <template v-for="s2item in sitem.children">
                <MenuItem :name="s2item.path" :to="item2path(item, sitem, s2item)">
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
          @on-click="gotoUrl"
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
import CollapsedMenu from './collapsed-menu.vue';
import { getUnion } from '@coms/large/libs/tools';
import mixin from './mixin';

const KeyActiveName = 'menuActiveName';
const KeyOpenName = 'menuOpenNames';
export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
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
  },
  data() {
    return {
      isLoadedMenu: false, //是否已经加载
      openedNames: [], //展开的 Submenu 的 name 集合
      activeName: '', //激活的菜单名
    };
  },

  methods: {
    setOpendNames(names) {
      this.openNames = names;
      this.$storedb.set(KeyOpenName, names);
    },
    gotoUrl(url) {
      this.$router.push({
        path: url,
      });
    },
    async handleSelect(name) {
      this.setViewHeight();
      this.activeName = name;
      await this.$storedb.set(KeyActiveName, name);
      if (!this.isContain()) this.setOpendNames([]);
      /*let path = '/' + name.replace(/^\/+/, '');
      if (this.$route.path == path) return;
      this.$router.push({
        path,
      });
      event.preventDefault();
      event.stopPropagation(); */
    },
    isContain(activeName, openedNames) {
      activeName = activeName || this.activeName;
      openedNames = openedNames || this.openedNames;
      return activeName.includes(openedNames.join('/'));
    },
  },
  computed: {
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
  watch: {
    openedNames() {
      if (this.isLoadedMenu) return;
      this.isLoadedMenu = true;
      this.$nextTick(async () => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
        //this.activeName = await this.$storedb.get('activeMenu');
      });
    },
  },
  async created() {
    this.activeName = (await this.$storedb.get(KeyActiveName)) || '';
    let opendList = (await this.$storedb.get(KeyOpenName)) || [];
    this.openedNames = this.isContain(this.activeName, opendList) ? opendList : [];
  },
};
</script>
<style lang="less">
@import './side-menu.less';
</style>
