import CommonIcon from '@coms/large/common-icon';
import { showTitle } from '@coms/large/libs/util';
export default {
  components: {
    CommonIcon,
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this);
    },
    showChildren(item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways));
    },
    getNameOrHref(item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : children0 ? item.children[0].name : item.name;
    },
  },
};
