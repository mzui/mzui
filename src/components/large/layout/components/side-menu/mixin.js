import CommonIcon from '@coms/large/common-icon';
import { showTitle } from '@coms/large/libs/util';


function setViewHeight() {
  let view = document.querySelector('#main_layout');
  if(view) view.style.height = window.innerHeight + 'px';
}
export default {
  components: {
    CommonIcon,
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this);
    },
    showChildren(item) {
      setViewHeight();
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways));
    },
    getNameOrHref(item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : children0 ? item.children[0].name : item.name;
    },
  },
};
